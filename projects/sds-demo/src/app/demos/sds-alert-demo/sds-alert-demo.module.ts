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
import {
   StDemoGeneratorModule,
   SdsAlertModule,
   StDocsModule, SdsRadioModule, SdsCheckboxModule, SdsInputModule, StSelectModule, SdsSwitchModule
} from '@stratio/egeo';

import { SdsAlertDemoComponent } from './sds-alert-demo';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
   imports: [
      CommonModule,
      SdsAlertModule,
      SdsRadioModule,
      SdsCheckboxModule,
      SdsSwitchModule,
      SdsInputModule,
      StSelectModule,
      StDemoGeneratorModule.withComponents({components: [SdsAlertDemoComponent]}),
      StDocsModule,
      ReactiveFormsModule
   ],
   declarations: [SdsAlertDemoComponent],
   providers: []
})
export class SdsAlertDemoModule { }
