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
import {StRadioMenuOption, StSwitchPosition} from '@stratio/egeo';

@Component({
   selector: 'st-switch-demo',
   templateUrl: './st-switch-demo.html',
   styleUrls: ['./st-switch-demo.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StSwitchDemoComponent {
   public configDoc: any = {
      html: 'demo/st-switch-demo/st-switch-demo.html',
      ts: 'demo/st-switch-demo/st-switch-demo.ts',
      component: 'lib/st-switch/st-switch.component.ts'
   };
   public loading: boolean;
   public model: boolean = false;
   public model2: boolean = false;
   public model3: boolean = false;

   public positionOptions: Array<StRadioMenuOption>;
   public activePositionOption: StRadioMenuOption;
   public dispositionOptions: Array<StRadioMenuOption>;
   public activeDispositionOption: StRadioMenuOption;
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
            value: StSwitchPosition.LEFT
         },
         {
            label: 'Right',
            value: StSwitchPosition.RIGHT
         }
      ];
      this.activePositionOption = this.positionOptions[0];
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
      this.activeDispositionOption = this.dispositionOptions[0];
   }
}
