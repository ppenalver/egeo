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
import {ChangeDetectorRef, Component} from '@angular/core';
import { StToggleButton } from '@stratio/egeo';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
   selector: 'sds-toggle-button-demo',
   templateUrl: './sds-toggle-button-demo.html',
   styleUrls: ['./sds-toggle-button-demo.scss'],
   animations: [
      trigger('fade', [
         state('void', style({opacity: 0})),
         state('*', style({opacity: 1})),
         transition(':enter', [animate(300)]),
         transition(':leave', [animate(300)])
      ])
   ]
})

export class SdsToggleButtonDemoComponent {
   public configDoc: any = {
      html: 'demo/sds-toggle-button-demo/sds-toggle-button-demo.html',
      ts: 'demo/sds-toggle-button-demo/sds-toggle-button-demo.ts',
      component: 'lib/sds-toggle-button/sds-toggle-button.component.ts'
   };
   public tabs: StToggleButton[];
   public sizeOptions: any;
   public activeSizeOption: any;
   public showLabel: boolean = true;
   public tabNumbers: boolean = false;
   public disabled: boolean;
   public description: string = 'Label';
   public selectedTabMessage: string = 'Example 1 is pressed.';
   public showSelectedTabMessage: boolean = true;

   private messageTimeout: any;

   constructor(private cd: ChangeDetectorRef) {
      this.tabs = [
         {
            label: 'Example 1',
            number: 5,
            active: true
         }, {
            label: 'Example 2',
            number: 10,
            active: false
         }, {
            label: 'Example 3',
            number: 1,
            active: false
         }

      ];

      this.sizeOptions = [
         {
            label: 'Regular',
            value: 'regular'
         },
         {
            label: 'Small',
            value: 'small'
         }
      ];
      this.activeSizeOption = this.sizeOptions[0];
   }

   onSelectTab(tab: StToggleButton): void {
      this.selectedTabMessage = tab.label + ' is pressed.';
      this.showSelectedTabMessage = true;
      this.cd.detectChanges();

      clearTimeout(this.messageTimeout);
      this.messageTimeout = null;

      this.messageTimeout = setTimeout(() => {
         if (this.messageTimeout) {
            this.showSelectedTabMessage = false;
            this.cd.detectChanges();
         }
      }, 2000);
   }
}
