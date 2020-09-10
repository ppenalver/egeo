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
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {environment} from '../environments/environment';

const mainRoute = environment.production ? 'home' : '/components/demo/alerts-demo';

export const routes: Routes = [
   { path: '', pathMatch: 'full', redirectTo: mainRoute },
   { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
   { path: 'general', loadChildren: () => import('./modules/general/general.module').then(m => m.GeneralModule)},
   { path: 'components', loadChildren: () => import('./modules/demos/demo.module').then(m => m.DemoModule)},
   { path: 'theme', loadChildren: () => import('./modules/theme/theme.module').then(m => m.ThemeModule)}
];

@NgModule({
   imports: [RouterModule.forRoot(routes, { useHash: true })],
   exports: [RouterModule]
})
export class AppRoutingModule { }
