/**
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
import {NgModule} from '@angular/core';
import {SdsLinkDemoComponent} from '@app/demos/sds-link-demo/sds-link-demo.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
   SdsCheckboxModule,
   SdsLinkModule,
   SdsRadioModule,
   StDemoGeneratorModule,
   StDocsModule,
   StInputModule
} from '@stratio/egeo';

@NgModule({
   declarations: [SdsLinkDemoComponent],
   imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      SdsLinkModule,
      StInputModule,
      SdsCheckboxModule,
      SdsRadioModule,
      StDemoGeneratorModule.withComponents({ components: [SdsLinkDemoComponent] }),
      StDocsModule
   ],
   exports: [SdsLinkDemoComponent]
})
export class SdsLinkDemoModule {}
