/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.netease.arctic.catalog;

import static com.netease.arctic.ams.api.properties.CatalogMetaProperties.CATALOG_TYPE_AMS;
import static com.netease.arctic.ams.api.properties.CatalogMetaProperties.CATALOG_TYPE_CUSTOM;
import static com.netease.arctic.ams.api.properties.CatalogMetaProperties.CATALOG_TYPE_GLUE;
import static com.netease.arctic.ams.api.properties.CatalogMetaProperties.CATALOG_TYPE_HADOOP;
import static com.netease.arctic.ams.api.properties.CatalogMetaProperties.CATALOG_TYPE_HIVE;

import com.netease.arctic.AmsClient;
import com.netease.arctic.PooledAmsClient;
import com.netease.arctic.ams.api.ArcticTableMetastore;
import com.netease.arctic.ams.api.CatalogMeta;
import com.netease.arctic.ams.api.Constants;
import com.netease.arctic.ams.api.NoSuchObjectException;
import com.netease.arctic.ams.api.TableFormat;
import com.netease.arctic.ams.api.client.AmsClientPools;
import com.netease.arctic.ams.api.client.ArcticThriftUrl;
import com.netease.arctic.ams.api.properties.CatalogMetaProperties;
import com.netease.arctic.mixed.BasicMixedIcebergCatalog;
import com.netease.arctic.table.TableMetaStore;
import com.netease.arctic.utils.CatalogUtil;
import org.apache.iceberg.aws.glue.GlueCatalog;
import org.apache.iceberg.common.DynConstructors;
import org.apache.iceberg.relocated.com.google.common.base.Preconditions;
import org.apache.iceberg.relocated.com.google.common.collect.Maps;
import org.apache.thrift.TException;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/** Catalogs, create catalog from arctic metastore thrift url. */
public class CatalogLoader {

  public static final String AMS_CATALOG_IMPL = BasicArcticCatalog.class.getName();
  public static final String HIVE_CATALOG_IMPL =
      "com.netease.arctic.hive.catalog.ArcticHiveCatalog";
  public static final String GLUE_CATALOG_IMPL = GlueCatalog.class.getName();
  public static final String MIXED_ICEBERG_CATALOG_IMP = BasicMixedIcebergCatalog.class.getName();

  /**
   * Entrypoint for loading Catalog.
   *
   * @param catalogUrl arctic catalog url, thrift://arctic-ams-host:port/catalog_name
   * @param properties client side catalog configs
   * @return arctic catalog object
   */
  public static ArcticCatalog load(String catalogUrl, Map<String, String> properties) {
    ArcticThriftUrl url = ArcticThriftUrl.parse(catalogUrl, Constants.THRIFT_TABLE_SERVICE_NAME);
    if (url.catalogName() == null || url.catalogName().contains("/")) {
      throw new IllegalArgumentException("invalid catalog name " + url.catalogName());
    }

    return loadCatalog(catalogUrl, url.catalogName(), properties);
  }

  /**
   * Entrypoint for loading catalog.
   *
   * @param catalogUrl arctic catalog url, thrift://arctic-ams-host:port/catalog_name
   * @return arctic catalog object
   */
  public static ArcticCatalog load(String catalogUrl) {
    return load(catalogUrl, Maps.newHashMap());
  }

  /**
   * get mixed-format catalog implement class name
   *
   * @param metastoreType - metastore type
   * @param catalogProperties - catalog properties
   * @return class name for catalog
   */
  private static String catalogImpl(String metastoreType, Map<String, String> catalogProperties) {
    Set<TableFormat> tableFormats = CatalogUtil.tableFormats(metastoreType, catalogProperties);
    Preconditions.checkArgument(
        tableFormats.size() == 1, "Catalog support only one table format now.");
    TableFormat tableFormat = tableFormats.iterator().next();
    Preconditions.checkArgument(
        TableFormat.MIXED_HIVE == tableFormat || TableFormat.MIXED_ICEBERG == tableFormat,
        "MixedCatalogLoader only support mixed-format, format: %s",
        tableFormat.name());

    String catalogImpl;
    switch (metastoreType) {
      case CATALOG_TYPE_HADOOP:
      case CATALOG_TYPE_GLUE:
      case CATALOG_TYPE_CUSTOM:
        Preconditions.checkArgument(
            TableFormat.MIXED_ICEBERG == tableFormat,
            "%s catalog support mixed-iceberg table only.",
            metastoreType);
        catalogImpl = MIXED_ICEBERG_CATALOG_IMP;
        break;
      case CATALOG_TYPE_HIVE:
        if (TableFormat.MIXED_HIVE == tableFormat) {
          catalogImpl = HIVE_CATALOG_IMPL;
        } else {
          catalogImpl = MIXED_ICEBERG_CATALOG_IMP;
        }
        break;
      case CATALOG_TYPE_AMS:
        if (TableFormat.MIXED_ICEBERG == tableFormat) {
          catalogImpl = AMS_CATALOG_IMPL;
        } else {
          throw new IllegalArgumentException("Internal Catalog mixed-iceberg table only");
        }
        break;
      default:
        throw new IllegalStateException("unsupported metastore type:" + metastoreType);
    }
    return catalogImpl;
  }

  /**
   * Load catalog meta from arctic metastore.
   *
   * @param catalogUrl - catalog url
   * @return catalog meta
   */
  public static CatalogMeta loadMeta(String catalogUrl) {
    ArcticThriftUrl url = ArcticThriftUrl.parse(catalogUrl, Constants.THRIFT_TABLE_SERVICE_NAME);
    if (url.catalogName() == null || url.catalogName().contains("/")) {
      throw new IllegalArgumentException("invalid catalog name " + url.catalogName());
    }
    AmsClient client = new PooledAmsClient(catalogUrl);
    try {
      return client.getCatalog(url.catalogName());
    } catch (TException e) {
      throw new IllegalStateException("failed when load catalog " + url.catalogName(), e);
    }
  }

  /**
   * Show catalog list in arctic metastore.
   *
   * @param metastoreUrl url of arctic metastore
   * @return catalog name list
   */
  public static List<String> catalogs(String metastoreUrl) {
    try {
      return ((ArcticTableMetastore.Iface) AmsClientPools.getClientPool(metastoreUrl).iface())
          .getCatalogs().stream().map(CatalogMeta::getCatalogName).collect(Collectors.toList());
    } catch (TException e) {
      throw new IllegalStateException("failed when load catalogs", e);
    }
  }

  /**
   * Entrypoint for loading catalog
   *
   * @param metaStoreUrl arctic metastore url
   * @param catalogName arctic catalog name
   * @param properties client side catalog configs
   * @return arctic catalog object
   */
  private static ArcticCatalog loadCatalog(
      String metaStoreUrl, String catalogName, Map<String, String> properties) {
    AmsClient client = new PooledAmsClient(metaStoreUrl);
    try {
      CatalogMeta catalogMeta = client.getCatalog(catalogName);
      String type = catalogMeta.getCatalogType();
      catalogMeta.putToCatalogProperties(CatalogMetaProperties.AMS_URI, metaStoreUrl);
      CatalogUtil.mergeCatalogProperties(catalogMeta, properties);
      return createCatalog(
          catalogName,
          type,
          catalogMeta.getCatalogProperties(),
          CatalogUtil.buildMetaStore(catalogMeta));
    } catch (NoSuchObjectException e1) {
      throw new IllegalArgumentException("catalog not found, please check catalog name", e1);
    } catch (Exception e) {
      throw new IllegalStateException("failed when load catalog " + catalogName, e);
    }
  }

  /**
   * build and initialize a mixed-format catalog.
   *
   * @param catalogName catalog-name
   * @param metastoreType metastore type
   * @param properties catalog properties
   * @param metaStore auth context
   * @return initialized catalog.
   */
  public static ArcticCatalog createCatalog(
      String catalogName,
      String metastoreType,
      Map<String, String> properties,
      TableMetaStore metaStore) {
    properties =
        CatalogUtil.withIcebergCatalogInitializeProperties(catalogName, metastoreType, properties);
    String catalogImpl = catalogImpl(metastoreType, properties);
    ArcticCatalog catalog = buildCatalog(catalogImpl);
    catalog.initialize(catalogName, properties, metaStore);
    return catalog;
  }

  private static ArcticCatalog buildCatalog(String impl) {
    DynConstructors.Ctor<ArcticCatalog> ctor;
    try {
      ctor = DynConstructors.builder(ArcticCatalog.class).impl(impl).buildChecked();
    } catch (NoSuchMethodException e) {
      throw new IllegalArgumentException(
          String.format("Cannot initialize Catalog implementation %s: %s", impl, e.getMessage()),
          e);
    }
    try {
      return ctor.newInstance();
    } catch (ClassCastException e) {
      throw new IllegalArgumentException(
          String.format("Cannot initialize Catalog, %s does not implement Catalog.", impl), e);
    }
  }
}
