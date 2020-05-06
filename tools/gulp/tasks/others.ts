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
import { task } from 'gulp';
import { mkdirpSync } from 'fs-extra';
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const gulp = require('gulp');

import { buildConfig, sequenceTask } from 'build-tools';

const { outputDir, packagesDir, packagesDemoDir } = buildConfig;

task('demo-app:create-dist', (done) => {
   mkdirpSync(outputDir);
   done();
});

task('demo-app:replace:assets', (done) => {
   const distPath: string = join(outputDir, 'demo-app');
   const cssFiles: string[] = readdirSync(distPath).filter(name => name.endsWith('.css'));
   cssFiles.map(file => {
      const filePath: string = join(distPath, file);
      const content = readFileSync(filePath, 'utf-8').replace(/\/assets/g, 'assets');
      writeFileSync(filePath, content, { encoding: 'utf-8' });
   });
   done();
});

task('demo-app:copy:sourcecode:demo', () => {
   const destinyDemoPath: string = join(packagesDemoDir, 'assets');
   const originPath: string = join(packagesDemoDir, 'app/demos');
   return gulp.src([`${originPath}/**/*.html`, `${originPath}/**/*.ts`, `!${originPath}/**/*.d.ts`], {
       base: originPath
       }).pipe(gulp.dest(`${destinyDemoPath}/source-code/demo`));
});

task('demo-app:copy:sourcecode:lib', () => {
   const destinyDemoPath: string = join(packagesDemoDir, 'assets');
   const originPath: string = join(packagesDir, 'lib');

   return gulp.src([`${originPath}/**/*.ts`, `${originPath}/**/*.module.ts`, `!${originPath}/**/*.d.ts`], {
       base: originPath
       }).pipe(gulp.dest(`${destinyDemoPath}/source-code/lib`));
});

task('demo-app:copy:sourcecode', sequenceTask('demo-app:copy:sourcecode:demo', 'demo-app:copy:sourcecode:lib'));
