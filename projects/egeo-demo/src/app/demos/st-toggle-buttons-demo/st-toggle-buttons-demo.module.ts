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
   StCheckboxModule,
   StDemoGeneratorModule,
   StDocsModule,
   StRadioModule,
   StToggleButtonsModule
} from '@stratio/egeo';

import { StToggleButtonsDemoComponent } from './st-toggle-buttons-demo';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      StCheckboxModule,
      StRadioModule,
      StToggleButtonsModule,
      StDemoGeneratorModule.withComponents({ components: [StToggleButtonsDemoComponent] }),
      StDocsModule
   ],
   declarations: [StToggleButtonsDemoComponent],
   providers: []
})
export class StToggleButtonsDemoModule { }
