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
import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DemoSideMenu } from './menu.model';
@Component({
   selector: 'demo-menu',
   templateUrl: './menu.html',
   styleUrls: ['./menu.scss']
})
export class MenuComponent implements OnInit {

   @Input() options: DemoSideMenu[] = [];
   @Input() sdsOptions: DemoSideMenu[] = [];
   @Output() selected: EventEmitter<DemoSideMenu> = new EventEmitter<DemoSideMenu>();

   constructor(private _router: Router) {

   }

   ngOnInit(): void {
      const currentDemo = this.options.concat(this.sdsOptions).find(d => d.url === this._router.url);
      if (currentDemo) {
         this.selected.emit(currentDemo);
      }
   }

   navigate(demo: DemoSideMenu): void {
      this._router.navigate([demo.url]);
      this.selected.emit(demo);
   }

   isActive(url: string): boolean {
      return this._router.url.indexOf(url) > -1;
   }
}
