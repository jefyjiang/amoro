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

package com.netease.arctic.hive.utils;

import com.netease.arctic.hive.HiveTableProperties;
import org.apache.iceberg.relocated.com.google.common.collect.Maps;
import org.junit.Assert;
import org.junit.Test;

import java.util.Map;

public class TestCompatibleHivePropertyUtil {

  @Test
  public void testGetNewProperty() {
    Map<String, String> properties = Maps.newHashMap();
    Assert.assertFalse(
        CompatibleHivePropertyUtil.propertyAsBoolean(
            properties, HiveTableProperties.ARCTIC_TABLE_FLAG, false));

    properties.put(HiveTableProperties.ARCTIC_TABLE_FLAG, "true");
    Assert.assertTrue(
        CompatibleHivePropertyUtil.propertyAsBoolean(
            properties, HiveTableProperties.ARCTIC_TABLE_FLAG, false));

    properties.put(HiveTableProperties.ARCTIC_TABLE_FLAG_LEGACY, "false");
    Assert.assertTrue(
        CompatibleHivePropertyUtil.propertyAsBoolean(
            properties, HiveTableProperties.ARCTIC_TABLE_FLAG, false));
  }

  @Test
  public void testGetLegacyProperty() {
    Map<String, String> properties = Maps.newHashMap();
    properties.put(HiveTableProperties.ARCTIC_TABLE_FLAG_LEGACY, "true");
    Assert.assertTrue(
        CompatibleHivePropertyUtil.propertyAsBoolean(
            properties, HiveTableProperties.ARCTIC_TABLE_FLAG, false));
  }
}
