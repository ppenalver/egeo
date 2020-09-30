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
import { SdsTab } from '@stratio/egeo';
import {FormControl} from '@angular/forms';

@Component({
   selector: 'sds-tab-demo',
   templateUrl: './sds-tab-demo.component.html',
   styleUrls: ['./sds-tab-demo.component.scss']
})

export class SdsTabDemoComponent {
   public configDoc: Record<string, string> = {
      html: 'demo/sds-tab-demo/sds-tab-demo.component.html',
      ts: 'demo/sds-tab-demo/sds-tab-demo.component.ts',
      component: 'lib/sds-tab/sds-tab.component.ts'
   };
   public options: SdsTab[] = [
      {id: 'tab1', text: 'Tab 1'},
      {id: 'tab2', text: 'Tab 2'},
      {id: 'tab3', text: 'Tab 3'}
   ];

   public active: SdsTab = this.options[0];
   public tabSize: FormControl;
   public borderBottom: FormControl;
   public selectedTabMessage: string = 'Showing Tab 1.';

   constructor() {
      this.tabSize = new FormControl(1);
      this.borderBottom = new FormControl(false);
   }
}
