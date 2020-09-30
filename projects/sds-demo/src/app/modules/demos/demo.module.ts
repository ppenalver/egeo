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
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DemoLayoutComponent } from './demo-layout/demo-layout';
import { SharedModule } from '../../shared/shared.module';

export const routes: Routes = [
   { path: '', redirectTo: 'demo/alerts-demo' },
   {
      path: '', component: DemoLayoutComponent, children: [
         { path: 'demo', loadChildren:  () => import('./demo-loader.module').then(m =>  m.DemoLoaderModule) }
      ]
   }
];

@NgModule({
   imports: [
      CommonModule,
      SharedModule,
      RouterModule.forChild(routes)
   ],
   declarations: [DemoLayoutComponent]
})
export class DemoModule { }
