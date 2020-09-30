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
import { writeFileSync } from 'fs';
import { join } from 'path';
import { buildConfig } from './build-config';

/** Version of the project that will be used to replace the placeholder. */
const { projectVersion } = buildConfig;

/** Updates the `package.json` file of the specified package. Replaces the version placeholder. */
export function updatePackageVersion(packageDir: string): void {
   const packagePath = join(packageDir, 'package.json');
   const packageConfig = require(packagePath);
   // Replace the `0.0.0-PLACEHOLDER` version name with the version of the root package.json file.
   packageConfig.version = packageConfig.version.replace('0.0.0-PLACEHOLDER', projectVersion);

   writeFileSync(packagePath, JSON.stringify(packageConfig, null, 2));
}
