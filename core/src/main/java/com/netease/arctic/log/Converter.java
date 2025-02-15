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

package com.netease.arctic.log;

import java.io.Serializable;

/**
 * A generic interface for converting data types.
 *
 * @param <F> The type of the element to be converted.
 * @param <O> The output type.
 * @param <C> The context for passing optional conversion instructions.
 * @param <T> The type which is inside of <F> type.
 */
public interface Converter<F, O, C, T> extends Serializable {
  /**
   * Converts elements of type {@code From} into elements of type {@code To}.
   *
   * @param source The element to be converted.
   * @param context The context with conversion instructions and utilities.
   * @return The element in the target type.
   */
  O convert(F source, C context);
}
