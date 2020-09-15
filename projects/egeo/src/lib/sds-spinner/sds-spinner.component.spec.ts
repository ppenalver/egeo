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
import { CommonModule } from '@angular/common';
import { DebugElement, ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SdsSpinnerComponent } from './sds-spinner.component';

let fixture: ComponentFixture<SdsSpinnerComponent>;
let comp: SdsSpinnerComponent;

describe('SdsSpinnerComponent', () => {

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [CommonModule, RouterTestingModule],
         declarations: [SdsSpinnerComponent]
      })
         .overrideComponent(SdsSpinnerComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
         })
         .compileComponents();  // compile template and css
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(SdsSpinnerComponent);
      comp = fixture.componentInstance;
   });

   it('should create', () => {
      expect(comp).toBeTruthy();
   });
});
