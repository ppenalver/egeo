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
import { StPopoverFilterComponent } from './st-popover-filter.component';
import { StPopOverModule } from '../../../st-pop-over/st-pop-over.module';
import { SdsCheckboxModule } from '../../../sds-checkbox/sds-checkbox.module';
import { StTableHeader } from '../table-header.interface';


let fakeField: StTableHeader = {
   id: 'group',
   label: 'Group',
   sortable: true,
   filterable: true,
   filters: {
      title: 'test',
      filterConfig: [{ id: 0, name: '1111' }]
   }
};

describe('StPopoverFilterComponent', () => {
   let component: StPopoverFilterComponent;
   let fixture: ComponentFixture<StPopoverFilterComponent>;

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [SdsCheckboxModule, StPopOverModule],
         declarations: [StPopoverFilterComponent]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(StPopoverFilterComponent);
      component = fixture.componentInstance;
      component.field = fakeField;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   describe('Should calculate its position in axis X when it is going to be visible', () => {
      it ('and should be aligned to the left side of parent', () => {
         component.hidden = false;

         expect(component.offsetX).toEqual((fixture.nativeElement.offsetLeft - fixture.nativeElement.offsetWidth) * -1);
      });
   });
});
