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
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Component, EventEmitter, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {StForegroundNotificationsComponent} from './st-foreground-notifications';
import {StForegroundNotificationsModule} from './st-foreground-notifications.module';

import {
   StNotificationDisplayOptions,
   StNotificationPosition,
   StNotificationType
} from './st-foreground-notifications.model';
import {StForegroundNotificationsService} from './st-foreground-notifications.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
   template: `
      <div class="test-container">
         <st-foreground-notifications
            (close)="onClose.emit()"
            (autoClose)="onAutoClose.emit()">
         </st-foreground-notifications>
      </div>`
})
class TestStFNComponent {
   config: StNotificationDisplayOptions = {
      message: 'The request is understood <a>Check the database</a> <a>Check the database2</a>'
   };
   onClose: EventEmitter<void> = new EventEmitter();
   onAutoClose: EventEmitter<void> = new EventEmitter();
   @ViewChild(StForegroundNotificationsComponent, {static: true}) notification: StForegroundNotificationsComponent;

   constructor() {
   }
}

let comp: TestStFNComponent;
let _notifications: StForegroundNotificationsService;
let fixture: ComponentFixture<TestStFNComponent>;
let nativeElement: HTMLElement;

describe('StForegroundNotificationsComponent', () => {
   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [StForegroundNotificationsModule, BrowserAnimationsModule],
         declarations: [TestStFNComponent],
         providers: [
            {
               provide: DomSanitizer,
               useValue: {
                  sanitize: () => '<p>The request is understood <a>Check the database</a> <a>Check the database2</a>  </p>',
                  bypassSecurityTrustHtml: () => 'safeString'
               }
            },
            StForegroundNotificationsService
         ]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(TestStFNComponent);
      comp = fixture.componentInstance;
      _notifications = TestBed.get(StForegroundNotificationsService);
      nativeElement = fixture.nativeElement;
      comp.notification.ngOnInit();
   });

   describe('When component is visible ', () => {
      it('And notificationType is defined as info, The element should contain "st-notification--info" class', fakeAsync(() => {
         _notifications.addNotification({
            notificationType: StNotificationType.INFO
         });
         tick(6500);

         expect(nativeElement.querySelector('.st-notification').classList).toContain('st-notification--info');
         expect(nativeElement.querySelector('.st-notification').classList).not.toContain('st-notification--warning');
         expect(nativeElement.querySelector('.st-notification').classList).not.toContain('st-notification--success');
         expect(nativeElement.querySelector('.st-notification').classList).not.toContain('st-notification--critical');
      }));

      it('And status is defined as sucess, element should contain "st-notification--success" class', fakeAsync(() => {
         _notifications.addNotification({
            notificationType: StNotificationType.SUCCESS
         });
         tick(6500);

         expect(nativeElement.querySelector('.st-notification').classList).toContain('st-notification--success');
         expect(nativeElement.querySelector('.st-notification').classList).not.toContain('st-notification--warning');
         expect(nativeElement.querySelector('.st-notification').classList).not.toContain('st-notification--info');
         expect(nativeElement.querySelector('.st-notification').classList).not.toContain('st-notification--critical');
      }));

      it('And status is defined as warning, element should contain "st-notification--warning" class', fakeAsync(() => {
         _notifications.addNotification({
            notificationType: StNotificationType.WARNING
         });
         tick(6500);

         expect(nativeElement.querySelector('.st-notification').classList).toContain('st-notification--warning');
         expect(nativeElement.querySelector('.st-notification').classList).not.toContain('st-notification--info');
         expect(nativeElement.querySelector('.st-notification').classList).not.toContain('st-notification--success');
         expect(nativeElement.querySelector('.st-notification').classList).not.toContain('st-notification--critical');
      }));

      it('And status is defined as critical, element should contain "st-notification--critical" class', fakeAsync(() => {
         _notifications.addNotification({
            notificationType: StNotificationType.CRITICAL,
            criticalTimeout: 6000
         });
         tick(6500);

         expect(nativeElement.querySelector('.st-notification').classList).toContain('st-notification--critical');
         expect(nativeElement.querySelector('.st-notification').classList).not.toContain('st-notification--warning');
         expect(nativeElement.querySelector('.st-notification').classList).not.toContain('st-notification--success');
         expect(nativeElement.querySelector('.st-notification').classList).not.toContain('st-notification--info');
      }));

      it('And "notificationType" is not defined, element should contain "st-notification--info" class', fakeAsync(() => {
         _notifications.addNotification();
         tick(6500);

         expect(nativeElement.querySelector('.st-notification').classList).toContain('st-notification--info');
         expect(nativeElement.querySelector('.st-notification').classList).not.toContain('st-notification--warning');
         expect(nativeElement.querySelector('.st-notification').classList).not.toContain('st-notification--success');
         expect(nativeElement.querySelector('.st-notification').classList).not.toContain('st-notification--critical');
      }));

      it('And user click on the close icon, the element should fade out and then hidden', fakeAsync(() => {
         _notifications.addNotification({
            notificationType: StNotificationType.INFO,
            margin: 0,
            closeIcon: true,
            positionReference: '.test-container',
            position: StNotificationPosition.CENTER_CENTER
         });
         tick(6500);
         let closeButton: HTMLElement = nativeElement.querySelector('.st-notification__close-icon');
         closeButton.click();
         tick(1000);
         expect((nativeElement.querySelector('.st-notification') as HTMLElement).style.opacity).not.toBe('1');
      }));

      it(`when the config option "timeout" is set as 6000ms the element should fade out and then
         hidden in the time set`, fakeAsync(() => {
         _notifications.addNotification({
            notificationType: StNotificationType.INFO,
            margin: 0,
            positionReference: '.test-container',
            position: StNotificationPosition.CENTER_CENTER
         });

         tick(6500);
         expect((nativeElement.querySelector('.st-notification') as HTMLElement).style.opacity).not.toBe('1');
      }));
   });
});
