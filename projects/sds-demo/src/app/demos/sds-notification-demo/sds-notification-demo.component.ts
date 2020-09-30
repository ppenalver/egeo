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
import { ChangeDetectorRef, Component } from '@angular/core';
import {
   SdsNotificationDisplayOptions,
   SdsNotificationIcon,
   SdsNotificationType
} from '../../../../../egeo/src/lib/sds-notification/sds-notification.model';
import {
   SdsNotificationComponent
} from '@stratio/egeo';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
   selector: 'sds-notification-demo',
   templateUrl: './sds-notification-demo.component.html',
   animations: [
      trigger('fade', [
         state('void', style({ opacity: 0 })),
         state('*', style({ opacity: 1 })),
         transition(':enter', [animate(300)]),
         transition(':leave', [animate(300)])
      ])
   ],
   styleUrls: ['./sds-notification-demo.component.scss']
})
export class SdsNotificationDemoComponent {
   public configDoc: any = {
      html: 'demo/sds-notification-demo/sds-notification-demo.component.html',
      ts: 'demo/sds-notification-demo/sds-notification-demo.component.ts',
      component: 'lib/sds-notification/sds-notification.component.ts'
   };

   public typeOptions: any = [
      {
         label: 'Info (default)',
         value: SdsNotificationType.INFO
      },
      {
         label: 'Success',
         value: SdsNotificationType.SUCCESS
      },
      {
         label: 'Warning',
         value: SdsNotificationType.WARNING
      },
      {
         label: 'Critical',
         value: SdsNotificationType.CRITICAL
      }
   ];
   public activeType: SdsNotificationType = SdsNotificationType.INFO;

   public iconOptions: any = [
      {
         label: 'Default icon',
         value: SdsNotificationIcon.DEFAULT
      },
      {
         label: 'Custom icon',
         value: 'custom'
      },
      {
         label: 'No icon',
         value: SdsNotificationIcon.NONE
      }
   ];
   public activeIconOption: SdsNotificationType | string = SdsNotificationIcon.DEFAULT;

   public customIconsOptions: any = [
      {
         label: 'Example 1',
         value: 'icon-mute'
      },
      {
         label: 'Example 2',
         value: 'icon-plane'
      },
      {
         label: 'Example 3',
         value: 'icon-cog'
      },
      {
         label: 'Example 4',
         value: 'icon-user-x'
      }
   ];

   public customIconsOption: string = 'icon-mute';

   public configForm: FormGroup;
   public notificationsConfig: SdsNotificationDisplayOptions;
   public showCloseControlMessage: boolean = false;
   public queuedNotifications: Array<SdsNotificationDisplayOptions> = [];

   private componentDestroyed$: Subject<void>;

   constructor(private cd: ChangeDetectorRef, private fb: FormBuilder) {
      this.componentDestroyed$ = new Subject();
      this.notificationsConfig = { ...SdsNotificationComponent.DEFAULT_CONFIG };
      this.notificationsConfig.message = 'Notification message. <a href="http://www.stratio.com" target="_blank">Link example</a>';
      this.configForm = this.fb.group({
         type: this.fb.control(this.notificationsConfig.notificationType),
         message: this.fb.control(this.notificationsConfig.message),
         icon: this.fb.control(this.notificationsConfig.notificationIcon),
         customIcon: this.fb.control('icon-mute'),
         closeControl: this.fb.control(this.notificationsConfig.closeIcon),
         timeout: this.fb.control(this.notificationsConfig.timeout),
         multipleTimeout: this.fb.control(null),
         infoTimeout: this.fb.control(null),
         successTimeout: this.fb.control(null),
         warningTimeout: this.fb.control(null),
         criticalTimeout: this.fb.control(null),
         maxWidth: this.fb.control(this.notificationsConfig.maxWidth),

         showSpecificTimeouts: this.fb.control(false),
         multiple: this.fb.control(false)
      });

      this.configForm.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((e) => {
            const notificationConfig: SdsNotificationDisplayOptions = {
               notificationType: this.configForm.get('type').value,
               message: this.configForm.get('message').value,
               notificationIcon: this.configForm.get('icon').value,
               closeIcon: this.configForm.get('closeControl').value
            };

            if (this.configForm.get('icon').value === 'custom') {
               notificationConfig.notificationIcon = this.configForm.get('customIcon').value;
            }

            this.notificationsConfig = Object.assign({}, this.notificationsConfig, notificationConfig);

            if (!this.getTimeoutToApply()) {
               this.configForm.get('closeControl').setValue(true, { emitEvent: false });
               this.configForm.get('closeControl').disable({ emitEvent: false });
               this.notificationsConfig = { ...this.notificationsConfig, closeIcon: true };
            } else if (!this.configForm.get('multiple').value) {
               this.configForm.get('closeControl').enable({ emitEvent: false });
            }
         });

      this.configForm.get('multiple').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            if (val) {
               this.configForm.get('closeControl').setValue(true, { emitEvent: false });
               this.configForm.get('closeControl').disable({ emitEvent: false });
               this.configForm.get('type').disable({ emitEvent: false });
            } else {
               this.configForm.get('type').enable({ emitEvent: false });
               this.configForm.get('closeControl').enable({ emitEvent: false });
            }
         });

      this.configForm.get('showSpecificTimeouts').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe(() => {
            this.configForm.get('multipleTimeout').setValue(null, { emitEvent: false });
            this.configForm.get('infoTimeout').setValue(null, { emitEvent: false });
            this.configForm.get('successTimeout').setValue(null, { emitEvent: false });
            this.configForm.get('warningTimeout').setValue(null, { emitEvent: false });
            this.configForm.get('criticalTimeout').setValue(null, { emitEvent: false });

            this.notificationsConfig.infoTimeout = null;
            this.notificationsConfig.successTimeout = null;
            this.notificationsConfig.warningTimeout = null;
            this.notificationsConfig.criticalTimeout = null;
         });


      this.configForm.get('maxWidth').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((maxWidth) => {
            this.notificationsConfig = {
               ...this.notificationsConfig,
               maxWidth
            };
         });

      this.configForm.get('criticalTimeout').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((criticalTimeout) => {
            this.notificationsConfig = {
               ...this.notificationsConfig,
               criticalTimeout
            };
         });

      this.configForm.get('warningTimeout').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((warningTimeout) => {
            this.notificationsConfig = {
               ...this.notificationsConfig,
               warningTimeout
            };
         });

      this.configForm.get('successTimeout').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((successTimeout) => {
            this.notificationsConfig = {
               ...this.notificationsConfig,
               successTimeout
            };
         });


      this.configForm.get('infoTimeout').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((infoTimeout) => {
            this.notificationsConfig = {
               ...this.notificationsConfig,
               infoTimeout
            };
         });


      this.configForm.get('multipleTimeout').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((multipleTimeout) => {

         });


      this.configForm.get('timeout').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((timeout) => {
            this.notificationsConfig = {
               ...this.notificationsConfig,
               timeout
            };
         });
   }

   public displayNotification(): void {
      this.queuedNotifications = [this.notificationsConfig];
      this.configForm.disable({ emitEvent: false });
   }

   public displayVariousNotifications(): void {
      this.configForm.disable({ emitEvent: false });
      this.queuedNotifications = [{
         ...this.notificationsConfig,
         notificationType: SdsNotificationType.SUCCESS
      }, {
         ...this.notificationsConfig,
         notificationType: SdsNotificationType.WARNING
      }, {
         ...this.notificationsConfig,
         notificationType: SdsNotificationType.CRITICAL
      }];
   }


   public onCloseControlClick(): void {
      this.showCloseControlMessage = true;

      setTimeout(() => {
         this.showCloseControlMessage = false;
         this.cd.detectChanges();
      }, 2000);
   }

   public enableControls(): void {
      this.queuedNotifications = this.queuedNotifications.slice(1);
      this.configForm.enable();
      this.cd.detectChanges();
   }

   public getTimeoutToApply(): number {
      const alertType = this.configForm.get('type').value;
      const alertTimeout = this.configForm.get('timeout').value;
      const infoTimeout = this.configForm.get('infoTimeout').value;
      const successTimeout = this.configForm.get('successTimeout').value;
      const warningTimeout = this.configForm.get('warningTimeout').value;
      const criticalTimeout = this.configForm.get('criticalTimeout').value;

      const auxMap = {
         [SdsNotificationType.INFO]: infoTimeout ?? alertTimeout,
         [SdsNotificationType.SUCCESS]: successTimeout ?? alertTimeout,
         [SdsNotificationType.WARNING]: warningTimeout ?? alertTimeout,
         [SdsNotificationType.CRITICAL]: criticalTimeout ?? 0
      };

      return auxMap[alertType];
   }
}
