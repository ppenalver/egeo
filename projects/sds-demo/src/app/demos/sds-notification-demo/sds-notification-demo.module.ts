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
   StDocsModule,
   SdsNotificationModule,
   StHeaderModule,
   StSelectModule
} from '@stratio/egeo';
import { SdsNotificationDemoComponent } from './sds-notification-demo.component';
import {SdsRadioModule, StInputModule, SdsCheckboxModule} from '@stratio/egeo';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SdsNotificationModule,
        StHeaderModule,
        StDocsModule,
        StDemoGeneratorModule.withComponents({components: [SdsNotificationDemoComponent]}),
        StSelectModule,
        SdsRadioModule,
        StInputModule,
       SdsCheckboxModule
    ],
   declarations: [SdsNotificationDemoComponent]
})
export class SdsNotificationDemoModule {}
