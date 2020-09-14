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
import {StCheckboxModule, StDemoGeneratorModule, StDocsModule, StRadioModule, SdsTextareaModule} from '@stratio/egeo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SdsTextareaDemoComponent } from './sds-textarea-demo';

@NgModule({
   imports: [
      CommonModule,
      StRadioModule,
      StCheckboxModule,
      SdsTextareaModule,
      StDemoGeneratorModule.withComponents({
         components: [SdsTextareaDemoComponent]
      }),
      FormsModule,
      ReactiveFormsModule,
      StDocsModule
   ],
   declarations: [SdsTextareaDemoComponent],
   providers: []
})
export class SdsTextareaDemoModule { }
