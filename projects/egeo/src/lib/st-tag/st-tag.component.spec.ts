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
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';

import { StTagComponent } from './st-tag.component';
import { StTagItem } from './st-tag.model';

describe('StTagComponent', () => {
   let component: StTagComponent;
   let fixture: ComponentFixture<StTagComponent>;

   const simpleTag: StTagItem = {
      id: 'simpleTag',
      text: 'Tag text'
   };

   const tagWithIcon: StTagItem = {
      id: 'complexTag',
      text: 'Tag title',
      icon: 'icon-lock'
   };

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StTagComponent],
         providers: [],
         schemas: [NO_ERRORS_SCHEMA]
      })
         .overrideComponent(StTagComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
         })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StTagComponent);
      component = fixture.componentInstance;
      component.tag = simpleTag;
      fixture.detectChanges();
   });


   describe('An icon can be displayed on the right', () => {

      describe('if property rightIcon is defined', () => {
         beforeEach(() => {
            component.tag.rightIcon = 'icon-edit-2';
            fixture.detectChanges();
         });

         it('icon is displayed to the right', () => {
            expect(fixture.nativeElement.querySelector('.st-tag__right-button .icon-edit-2')).not.toBeNull();
         });

         it('if user clicks on it, event is emitted if tag is not clickable', () => {
            spyOn(component.clickButton, 'emit');
            component.clickable = true;
            fixture.nativeElement.querySelector('.st-tag__right-button .icon-edit-2').click();

            expect(component.clickButton.emit).not.toHaveBeenCalled();

            component.clickable = false;
            fixture.nativeElement.querySelector('.st-tag__right-button .icon-edit-2').click();

            expect(component.clickButton.emit).toHaveBeenCalled();
         });
      });
   });

   it('If tag has an icon, it is displayed before text', () => {
      component.tag = tagWithIcon;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.st-tag__icon.' + component.tag.icon)).not.toBeNull();
   });

});
