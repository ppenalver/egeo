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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StFormFieldComponent } from './st-form-field.component';
import { SdsInputModule } from '../../sds-input/sds-input.module';
import { StFormDirectiveModule } from '../../directives/form/form-directives.module';
import { SdsCheckboxModule } from '../../sds-checkbox/sds-checkbox.module';
import { StSelectModule } from '../../st-select/st-select.module';
import { SdsSwitchModule } from '../../sds-switch/sds-switch.module';
import { SdsTextareaModule } from '../../sds-textarea/sds-textarea.module';

@NgModule({
   imports: [CommonModule,
      FormsModule,
      ReactiveFormsModule,
      SdsInputModule,
      SdsCheckboxModule,
      StSelectModule,
      SdsSwitchModule,
      SdsTextareaModule,
      StFormDirectiveModule],
   declarations: [StFormFieldComponent],
   exports: [StFormFieldComponent]
})

export class StFormFieldModule {
}
