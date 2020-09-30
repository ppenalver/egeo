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
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SdsNotificationComponent } from './sds-notification.component';
import { SdsNotificationModule } from './sds-notification.module';

import {
   SdsNotificationType
} from './sds-notification.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


let comp: SdsNotificationComponent;
let fixture: ComponentFixture<SdsNotificationComponent>;
let nativeElement: HTMLElement;

describe('SdsNotificationComponent', () => {
   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [SdsNotificationModule, BrowserAnimationsModule],
         declarations: [SdsNotificationComponent],
         providers: [
            {
               provide: DomSanitizer,
               useValue: {
                  sanitize: () => '<p>The request is understood <a>Check the database</a> <a>Check the database2</a>  </p>',
                  bypassSecurityTrustHtml: () => 'safeString'
               }
            }
         ]
      }).compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(SdsNotificationComponent);
      comp = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
   });

   describe('When component is visible ', () => {

      it('And notificationType is defined as info, The element should contain "st-notification--info" class', () => {
         comp.config = {
            notificationType: SdsNotificationType.INFO
         };
         fixture.detectChanges();
         expect(nativeElement.querySelector('.st-notification').classList).toContain('st-notification--info');
         expect(nativeElement.querySelector('.st-notification').classList).not.toContain('st-notification--warning');
         expect(nativeElement.querySelector('.st-notification').classList).not.toContain('st-notification--success');
         expect(nativeElement.querySelector('.st-notification').classList).not.toContain('st-notification--critical');
      });

      it('And status is defined as sucess, element should contain "st-notification--success" class', () => {

         comp.config = {
            notificationType: SdsNotificationType.SUCCESS
         };

         comp.ngOnChanges({
            config: new SimpleChange(null, comp.config, true)
         });
         fixture.detectChanges();
         const classList = nativeElement.querySelector('.st-notification').classList;

         expect(classList).toContain('st-notification--success');
         expect(classList).not.toContain('st-notification--warning');
         expect(classList).not.toContain('st-notification--info');
         expect(classList).not.toContain('st-notification--critical');
      });

      it('And status is defined as warning, element should contain "st-notification--warning" class', () => {

         comp.config = {
            notificationType: SdsNotificationType.WARNING
         };

         comp.ngOnChanges({
            config: new SimpleChange(null, comp.config, true)
         });
         fixture.detectChanges();
         const classList = nativeElement.querySelector('.st-notification').classList;

         expect(classList).toContain('st-notification--warning');
         expect(classList).not.toContain('st-notification--info');
         expect(classList).not.toContain('st-notification--success');
         expect(classList).not.toContain('st-notification--critical');
      });

      it('And status is defined as critical, element should contain "st-notification--critical" class', () => {

         comp.config = {
            notificationType: SdsNotificationType.CRITICAL
         };

         comp.ngOnChanges({
            config: new SimpleChange(null, comp.config, true)
         });
         fixture.detectChanges();
         const classList = nativeElement.querySelector('.st-notification').classList;

         expect(classList).toContain('st-notification--critical');
         expect(classList).not.toContain('st-notification--warning');
         expect(classList).not.toContain('st-notification--success');
         expect(classList).not.toContain('st-notification--info');
      });

      it('And "notificationType" is not defined, element should contain "st-notification--info" class', () => {
         comp.config = {
            notificationType: SdsNotificationType.INFO
         };

         comp.ngOnChanges({
            config: new SimpleChange(null, comp.config, true)
         });
         fixture.detectChanges();
         const classList = nativeElement.querySelector('.st-notification').classList;

         expect(classList).toContain('st-notification--info');
         expect(classList).not.toContain('st-notification--warning');
         expect(classList).not.toContain('st-notification--success');
         expect(classList).not.toContain('st-notification--critical');
      });

      it(`when the config option "timeout" is set as 400ms the element should fade out and then
         hidden in the time set`, fakeAsync(() => {
         comp.config = {
            notificationType: SdsNotificationType.INFO,
            timeout: 400
         };
         comp.ngOnChanges({
            config: new SimpleChange(null, comp.config, true)
         });
         fixture.detectChanges();
         tick(500);
         expect((nativeElement.querySelector('.st-notification') as HTMLElement).style.opacity).not.toBe('1');
      }));
   });
});
