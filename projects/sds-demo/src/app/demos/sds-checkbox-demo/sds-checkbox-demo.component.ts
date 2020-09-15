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
import { Component } from '@angular/core';
import { CssProperty } from '@app/shared/css-property-table/css-property-table.model';
import { StRadioMenuOption } from '@stratio/egeo';

@Component({
   selector: 'sds-checkbox-demo',
   templateUrl: './sds-checkbox-demo.component.html',
   styleUrls: ['./sds-checkbox-demo.component.scss']
})

export class SdsCheckboxDemoComponent {
   public configDoc: any = {
      html: 'demo/sds-checkbox-demo/sds-checkbox-demo.component.html',
      ts: 'demo/sds-checkbox-demo/sds-checkbox-demo.component.ts',
      component: 'lib/sds-checkbox/sds-checkbox.component.ts'
   };

   public cssProperties: CssProperty[] = [
      {
         name: '--egeo-sds-checkbox__icon--content',
         description: 'Checked icon content',
         default: '\e64c"'
      },
      {
         name: '--egeo-sds-checkbox__icon--line-height',
         description: 'Checked icon line height',
         default: '1'
      },
      {
         name: '--egeo-sds-checkbox__icon--font-size',
         description: 'Checked icon font size',
         default: '14px'
      }
   ];

   public dispositionOptions: Array<StRadioMenuOption>;
   public activeDispositionOption: string;
   public titleLabel: boolean;
   public label: boolean;
   public disabled: boolean;
   public model: boolean;
   public model2: boolean;
   public model3: boolean;
   public allChecked: boolean;

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

   selectAll(event: {checked: boolean; value: any}): void {
      this.model = event.checked;
      this.model2 = event.checked;
      this.model3 = event.checked;
   }

   checkAllSelected(): void {
      this.allChecked = this.model && this.model2 && this.model3;
   }
}
