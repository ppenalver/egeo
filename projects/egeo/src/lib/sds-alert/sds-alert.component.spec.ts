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
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { SdsAlertComponent } from './sds-alert.component';
import {SdsAlertService} from './sds-alert.service';

describe('SdsAlertComponent', () => {
   let component: SdsAlertComponent;
   let fixture: ComponentFixture<SdsAlertComponent>;

   beforeEach(() => {
      TestBed.configureTestingModule({
         declarations: [SdsAlertComponent],
         providers: [SdsAlertService]
      })
         .compileComponents();  // compile template and css
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(SdsAlertComponent);
      component = fixture.componentInstance;
   });

   it('Should be init correctly', fakeAsync(() => {
      fixture.detectChanges();
      expect(fixture.componentInstance).toBeDefined();
   }));
});
