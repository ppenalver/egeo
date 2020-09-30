/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */

import { resolve, dirname, join } from 'path';
import { existsSync } from 'fs';

const BUILD_CONFIG_FILENAME = 'build-config.js';

export interface BuildConfig {
   /** Current version of the project. */
   projectVersion: string;
   /** Path to the root of the project. */
   projectDir: string;
   /** Path to the directory where all packages are living. */
   packagesDir: string;
   /** Path to the directory where all demo packages are living. */
   packagesDemoDir: string;
   /** Path to the directory where the output will be stored. */
   outputDir: string;
   /** Path where docs be puts in release (Inside release module path) */
   docPath: string;
   /** Html files path name inside docs path */
   htmlPath: string;
   /** markdown files path name inside docs path */
   mdPath: string;
}

let currentDir = process.cwd();
 while (!existsSync(resolve(currentDir, BUILD_CONFIG_FILENAME))) {
    let parentDir = dirname(currentDir);
    if (parentDir === currentDir) {
      break;
    }
    currentDir = parentDir;
}

 const buildConfigPath = join(currentDir, BUILD_CONFIG_FILENAME);


// Load the config file using a basic CommonJS import.
export const buildConfig = require(buildConfigPath) as BuildConfig;
