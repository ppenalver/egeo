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
/**
 * Build configuration for the packaging tool. This file will be automatically detected and used
 * to build the different packages inside of Material.
 */
const {join} = require('path');

/** Current version of the project*/
const buildVersion = require('./package.json').version;

/** License that will be placed inside of all created bundles. */
const buildLicense = `/**
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */`;

module.exports = {
   projectVersion: buildVersion,
   projectDir: __dirname,
   packagesDir: join(__dirname, 'projects/egeo/src'),
   packagesDemoDir: join(__dirname, 'projects/sds-demo/src'),
   outputDir: join(__dirname, 'dist'),
   licenseBanner: buildLicense,
   htmlPath: 'html',
   mdPath: 'md',
   docPath: 'docs'
};
