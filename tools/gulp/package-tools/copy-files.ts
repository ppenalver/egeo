
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
import { sync as glob } from 'glob';
import { mkdirpSync, copySync } from 'fs-extra';
import { join, dirname } from 'path';

/** Function to copy files that match a glob to another directory. */
export function copyFiles(fromPath: string, fileGlob: string, outDir: string): void {
   glob(fileGlob, { cwd: fromPath }).forEach(filePath => {
      let fileDestPath = join(outDir, filePath);
      mkdirpSync(dirname(fileDestPath));
      copySync(join(fromPath, filePath), fileDestPath);
   });
}
