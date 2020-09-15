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
import {NO_ERRORS_SCHEMA } from '@angular/core';
import {  ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualScrollerModule } from 'ngx-virtual-scroller';

// Components
import { ListItemComponent } from '../list-item/list-item.component';
import { ListScrollComponent } from './list-scroll.component';

// Order modules
import { StSearchModule } from '../../st-search/st-search.module';
import { SdsCheckboxModule } from '../../sds-checkbox/sds-checkbox.module';

let comp: ListScrollComponent;
let fixture: ComponentFixture<ListScrollComponent>;

let qaTag: string = 'st-two-list-test';


describe('StTwoListSelectionComponent', () => {
   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [StSearchModule, VirtualScrollerModule, SdsCheckboxModule],
         declarations: [ListScrollComponent, ListItemComponent],
         schemas: [NO_ERRORS_SCHEMA]
      })
         .compileComponents();  // compile template and css
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(ListScrollComponent);
      comp = fixture.componentInstance;
      comp.qaTag = qaTag;
   });

   describe('ListScrollComponent', () => {
      it('Should init correctly', () => {
         expect(comp.listQaTag).toEqual(qaTag + '-scroll-list');
         expect(comp.listCheckAllQaTag).toEqual(qaTag + '-check-all-scroll-list');
      });
   });
});
