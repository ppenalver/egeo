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
import {DebugElement, Component, ViewChild, EventEmitter} from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { StModal2Component } from './st-modal2.component';
import {StWindowRefService} from '../utils/window-service';
import {StModal2Config} from './st-modal2.model';


@Component({
   selector: 'st-modal2-test',
   template: `
       <st-modal2 [modalConfig]="modalConfig" [showModal]="true" (closeEscape)="closeOnEscape.emit()">
        <div>Modal content</div>
       </st-modal2>
    `
})
export class Modal2TestComponent {
   @ViewChild(StModal2Component, {static: false}) modalComponent: StModal2Component;
   public modalConfig: StModal2Config = {
      closeControl: true,
      title: 'Test title',
      showStandardHeader: true,
      showStandardActions: true
   };
   public closeOnEscape: EventEmitter<any> = new EventEmitter<any>();
   public modalTitle: string = '';
   public hideCloseBtn: boolean = false;
}

describe('StModal2', () => {
   describe('StModal2Component', () => {
      let comp: Modal2TestComponent;
      let fixture: ComponentFixture<Modal2TestComponent>;
      let de: DebugElement;

      beforeEach(() => {
         TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
            declarations: [Modal2TestComponent, StModal2Component],
            providers: [StWindowRefService],
            schemas: [NO_ERRORS_SCHEMA]
         }).compileComponents();  // compile template and css
      });

      beforeEach(() => {
         fixture = TestBed.createComponent(Modal2TestComponent);
         comp = fixture.componentInstance;
      });


      it('should be init', () => {
         fixture.detectChanges();

         const title: string = fixture.nativeElement.querySelector('.st-modal__header__title').textContent;
         expect(title.trim()).toBe(comp.modalConfig.title);
         expect(fixture.nativeElement.querySelector('.close-button')).toBeDefined();
      });

      it('should can hide close button', () => {
         comp.hideCloseBtn = true;
         fixture.detectChanges();
         expect(fixture.nativeElement.querySelector('.st-modal__header__title__status-icon')).toBeDefined();
      });

      it('should emit close event when pressing escape if the option is activated', async(() => {
         fixture.detectChanges();

         const onCloseEmitter: any = comp.modalComponent.closeEscape;
         spyOn(onCloseEmitter, 'emit');

         const event: any = document.createEvent('Event');
         event.keyCode = 27;
         event.initEvent('keydown');
         document.dispatchEvent(event);
         fixture.detectChanges();

         fixture.whenStable().then(() => {
            expect(onCloseEmitter.emit).toHaveBeenCalled();
         });
      }));
   });
});
