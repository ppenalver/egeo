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
   SdsButtonModule,
   SdsCheckboxModule,
   SdsRadioModule,
   StDemoGeneratorModule,
   StDocsModule,
   StInputModule
} from '@stratio/egeo';

import { SdsButtonDemoComponent } from './sds-button-demo.component';
import { CssPropertyTableModule } from '@app/shared/css-property-table/css-property-table.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
   imports: [
      CommonModule,
      SdsButtonModule,
      StInputModule,
      SdsCheckboxModule,
      SdsRadioModule,
      ReactiveFormsModule,
      StDemoGeneratorModule.withComponents({ components: [SdsButtonDemoComponent] }),
      StDocsModule,
      CssPropertyTableModule
   ],
   declarations: [SdsButtonDemoComponent],
   providers: []
})
export class SdsButtonDemoModule { }
