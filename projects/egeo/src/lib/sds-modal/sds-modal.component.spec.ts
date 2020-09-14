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

import { SdsModalComponent } from './sds-modal.component';
import {StWindowRefService} from '../utils/window-service';
import {SdsModalConfig} from './sds-modal.model';


@Component({
   selector: 'sds-modal-test',
   template: `
       <sds-modal [modalConfig]="modalConfig" [showModal]="true" (closeEscape)="closeOnEscape.emit()">
        <div>Modal content</div>
       </sds-modal>
    `
})
export class Modal2TestComponent {
   @ViewChild(SdsModalComponent, {static: false}) modalComponent: SdsModalComponent;
   public modalConfig: SdsModalConfig = {
      closeControl: true,
      title: 'Test title',
      showDefaultHeader: true
   };
   public closeOnEscape: EventEmitter<any> = new EventEmitter<any>();
   public modalTitle: string = '';
   public hideCloseBtn: boolean = false;
}

describe('SdsModal', () => {
   describe('SdsModalComponent', () => {
      let comp: Modal2TestComponent;
      let fixture: ComponentFixture<Modal2TestComponent>;
      let de: DebugElement;

      beforeEach(() => {
         TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
            declarations: [Modal2TestComponent, SdsModalComponent],
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
