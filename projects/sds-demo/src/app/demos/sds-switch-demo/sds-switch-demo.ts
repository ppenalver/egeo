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
import {RadioChange, StRadioMenuOption, SdsSwitchPosition} from '@stratio/egeo';

@Component({
   selector: 'sds-switch-demo',
   templateUrl: './sds-switch-demo.html',
   styleUrls: ['./sds-switch-demo.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class SdsSwitchDemoComponent {
   public configDoc: any = {
      html: 'demo/sds-switch-demo/sds-switch-demo.html',
      ts: 'demo/sds-switch-demo/sds-switch-demo.ts',
      component: 'lib/sds-switch/sds-switch.component.ts'
   };
   public loading: boolean;
   public model: boolean = false;
   public model2: boolean = false;
   public model3: boolean = false;

   public positionOptions: Array<StRadioMenuOption>;
   public activePositionOption: RadioChange;
   public dispositionOptions: Array<StRadioMenuOption>;
   public activeDispositionOption: RadioChange;
   public titleLabel: boolean;
   public label: boolean;
   public disabled: boolean;

   constructor() {
      this.loading = true;
      this.titleLabel = true;
      this.label = true;
      this.positionOptions = [
         {
            label: 'Left',
            value: SdsSwitchPosition.LEFT
         },
         {
            label: 'Right',
            value: SdsSwitchPosition.RIGHT
         }
      ];
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
   }
}
