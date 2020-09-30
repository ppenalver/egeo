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
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { cloneDeep as _cloneDeep } from 'lodash';

import { SdsTab } from './sds-tab.model';
import { SdsTabComponent } from './sds-tab.component';
import { ChangeDetectionStrategy } from '@angular/core';


describe('SdsTabComponent', () => {
   beforeEach(() => {
      TestBed.configureTestingModule({
         declarations: [SdsTabComponent]
      })
         .overrideComponent(SdsTabComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
         })
         .compileComponents();  // compile template and css
   });

   let component: SdsTabComponent;
   let fixture: ComponentFixture<SdsTabComponent>;
   let fakeOptions: SdsTab[] = [
      {id: 'tab1', text: 'tab 1'},
      {id: 'tab2', text: 'tab 2'},
      {id: 'tab3', text: 'tab 3'}
   ];

   beforeEach(() => {
      TestBed.configureTestingModule({
         declarations: [SdsTabComponent]
      })
         .compileComponents();  // compile template and css
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(SdsTabComponent);
      component = fixture.componentInstance;
      component.options = fakeOptions;
      fixture.detectChanges();
   });


   describe('when it is initialized', () => {

      it ('if "options" input is not introduced, it throws an exception', () => {
         component.options = undefined;
         fixture.detectChanges();

         expect(() => component.ngOnInit()).toThrowError('sds-tab-component: field options is a required field');
      });

      it('only if option list has one option at least and if active tab is not defined, first option is activated', () => {
         // without options
         component.options = [];
         component.activeOption = undefined;

         component.ngOnInit();

         expect(component.isActive(fakeOptions[0])).toBeFalsy();

         // with options
         component.options = fakeOptions;
         component.activeOption = undefined;

         component.ngOnInit();

         expect(component.isActive(fakeOptions[0])).toBeTruthy();
         expect(component.activeOption).toBe(fakeOptions[0]);
      });

      it('if active option is defined, it will be used as the active option', () => {
         component.activeOption = fakeOptions[1];
         component.ngOnInit();

         expect(component.isActive(fakeOptions[1])).toBeTruthy();
      });
   });

   it('should be able to return if an option is active', () => {
      component.activeOption = fakeOptions[0];
      fixture.detectChanges();

      expect(component.isActive(fakeOptions[1])).toBeFalsy();
      expect(component.isActive(fakeOptions[0])).toBeTruthy();
   });

   describe('should be able to activate an option', () => {

      it('when active option is changed, active option is updated', () => {
         component.activateOption(fakeOptions[1]);
         fixture.detectChanges();

         expect(component.activeOption).toBe(fakeOptions[1]);
      });

      it('when active option is changed, an event is emitted with the active option', () => {
         spyOn(component.changedOption, 'emit');

         component.activateOption(fakeOptions[0]);
         fixture.detectChanges();

         expect(component.changedOption.emit).toHaveBeenCalledWith(fakeOptions[0]);
      });
   });
});
