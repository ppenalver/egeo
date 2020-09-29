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
import { task, src, dest, parallel } from 'gulp';
import { join } from 'path';
import { writeFileSync, mkdirpSync } from 'fs-extra';
import { Bundler, BundleResult } from 'scss-bundle';

import { buildConfig, buildScssFromFileTask } from 'build-tools';

const { projectDir, packagesDir, outputDir } = buildConfig;

const assetsSource = join(projectDir, 'assets');
const themeSourceFolder = join(packagesDir, 'theme');

const themeSourceFile = join(themeSourceFolder, 'theme.scss');
const gridSourceFile = join(themeSourceFolder, 'grid', 'grid.scss');
const sanitizeSourceFile = join(themeSourceFolder, 'vendors', 'sanitize.scss');

const packageOut = join(outputDir, 'egeo', 'theme');
const themeScssOutputFile = 'egeo-theme-stratio.scss';


// Tasks
task('styles:theme', buildScssFromFileTask(packageOut, themeSourceFile, true));
task('styles:grid', buildScssFromFileTask(packageOut, gridSourceFile, true));
task('styles:sanitize', buildScssFromFileTask(packageOut, sanitizeSourceFile, true));
task('styles:copy-fonts', () => src(join(assetsSource, '/**/*')).pipe(dest(join(packageOut, 'assets'))));

task('styles:theme:scss', () => {
   const allScssGlob = join(themeSourceFolder, '**/*.scss');
   return new Bundler().bundle(themeSourceFile, [allScssGlob]).then((result: BundleResult) => {
      mkdirpSync(packageOut);
      writeFileSync(join(packageOut, themeScssOutputFile), <any> result.bundledContent, { encoding: 'utf-8' });
   });
});

task('build:styles', parallel('styles:copy-fonts', 'styles:theme', 'styles:grid', 'styles:sanitize', 'styles:theme:scss'));
