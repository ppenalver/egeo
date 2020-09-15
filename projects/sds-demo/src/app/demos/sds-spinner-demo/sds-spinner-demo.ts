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
import {RadioChange} from '@stratio/egeo';

@Component({
   selector: 'sds-spinner-demo',
   templateUrl: 'sds-spinner-demo.html',
   styleUrls: ['./sds-spinner-demo.component.scss']
})
export class SdsSpinnerDemoComponent {
   public spinnerBackground: number = 0;
   public spinnerDisplay: number = 1;
   public spinnerColor: number = 1;
   public spinnerSize: number = 1;

   public configDoc: any = {
      html: 'demo/sds-spinner-demo/sds-spinner-demo.html',
      ts: 'demo/sds-spinner-demo/sds-spinner-demo.ts',
      component: 'lib/sds-spinner/sds-spinner.component.ts'
   };
   public size: number = 50;

   public cssProperties: CssProperty[] = [
      {
         name: '--egeo-sds-spinner--display',
         description: 'Spinner display',
         default: 'block'
      },
      {
         name: '--egeo-sds-spinner--size',
         description: 'Spinner width',
         default: '80px'
      },
      {
         name: '--egeo-sds-spinner--line-width',
         description: 'Spinner stroke width',
         default: '3px'
      },
      {
         name: '--egeo-sds-spinner--color',
         description: 'Spinner stroke color',
         default: '$action'
      }
   ];

   public onSpinnerColorChange(event: RadioChange): void {
      if (event.value === 2) {
         this.spinnerBackground = 1;
      }
   }

}
