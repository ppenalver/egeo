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
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {StRadioMenuOption} from '@stratio/egeo';

@Component({
   selector: 'sds-radio-demo',
   templateUrl: './sds-radio-demo.html',
   styleUrls: ['./sds-radio-demo.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class SdsRadioDemoComponent {
   public configDoc: any = {
      html: 'demo/sds-radio-demo/sds-radio-demo.html',
      ts: 'demo/sds-radio-demo/sds-radio-demo.ts',
      component: 'lib/sds-radio/sds-radio.component.ts'
   };
   public dispositionOptions: Array<StRadioMenuOption>;
   public activeDispositionOption: string;
   public titleLabel: boolean;
   public label: boolean;
   public disabled: boolean;
   public model: boolean;
   public model2: boolean;
   public model3: boolean;

   constructor() {
      this.titleLabel = true;
      this.label = true;
      this.dispositionOptions = [
         {
            label: 'Horizontal',
            value: 'horizontal'
         },
         {
            label: 'Vertical',
            value: 'vertical'
         }
      ];
      this.activeDispositionOption = this.dispositionOptions[1].value;
   }
}
