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
import {ChangeDetectorRef, Component} from '@angular/core';
import {
   SdsNotificationDisplayOptions,
   SdsNotificationIcon,
   SdsNotificationPosition,
   SdsNotificationType
} from '../../../../../egeo/src/lib/sds-notification/sds-notification.model';
import {Subject} from 'rxjs';
import {SdsNotificationService} from '../../../../../egeo/src/lib/sds-notification/sds-notification.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SdsAlertType} from '../../../../../egeo/src/lib/sds-alert/sds-alert.model';

@Component({
   selector: 'sds-notification-demo',
   templateUrl: './sds-notification-demo.component.html',
   animations: [
      trigger('fade', [
         state('void', style({opacity: 0})),
         state('*', style({opacity: 1})),
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

   public positionOptions: any = [
      {
         label: 'top left',
         value: SdsNotificationPosition.TOP_LEFT
      },
      {
         label: 'top center',
         value: SdsNotificationPosition.TOP_CENTER
      },
      {
         label: 'top right',
         value: SdsNotificationPosition.TOP_RIGHT
      },
      {
         label: 'center left',
         value: SdsNotificationPosition.CENTER_LEFT
      },
      {
         label: 'center center',
         value: SdsNotificationPosition.CENTER_CENTER
      },
      {
         label: 'center right',
         value: SdsNotificationPosition.CENTER_RIGHT
      },
      {
         label: 'bottom left',
         value: SdsNotificationPosition.BOTTOM_LEFT
      },
      {
         label: 'bottom center',
         value: SdsNotificationPosition.BOTTOM_CENTER
      },
      {
         label: 'bottom right',
         value: SdsNotificationPosition.BOTTOM_RIGHT
      }
   ];

   public positionReferenceOptions: any = [
      {
         label: 'Main tag element',
         value: '#main'
      },
      {
         label: 'Content component element',
         value: '.main-content'
      },
      {
         label: 'Window',
         value: 'html'
      }
   ];

   public showTimeoutChanged: boolean;
   public showMultipleTimeoutChanged: boolean;
   public showInfoTimeoutChanged: boolean;
   public showSuccessTimeoutChanged: boolean;
   public showWarningTimeoutChanged: boolean;
   public showCriticalTimeoutChanged: boolean;
   public showMarginChanged: boolean;
   public showWidthChanged: boolean;
   public configForm: FormGroup;
   public notificationsConfig: SdsNotificationDisplayOptions;
   public showCloseControlMessage: boolean = false;

   private componentDestroyed$: Subject<void>;
   private isShowing: boolean = false;

   constructor(private cd: ChangeDetectorRef, private _notifications: SdsNotificationService, private fb: FormBuilder) {
      this.componentDestroyed$ = new Subject();
      this.notificationsConfig = {...this._notifications.DEFAULT_CONFIG};
      this.notificationsConfig.message = 'Notification message. <a href="http://www.stratio.com" target="_blank">Link example</a>';
      this.notificationsConfig.positionReference = '#main';
      this.configForm = this.fb.group({
         type: this.fb.control(this.notificationsConfig.notificationType),
         message: this.fb.control(this.notificationsConfig.message),
         icon: this.fb.control(this.notificationsConfig.notificationIcon),
         customIcon: this.fb.control('icon-mute'),
         closeControl: this.fb.control(this.notificationsConfig.closeIcon),
         position: this.fb.control(this.notificationsConfig.position),
         positionReference: this.fb.control(this.notificationsConfig.positionReference),
         timeout: this.fb.control(this.notificationsConfig.timeout),
         multipleTimeout: this.fb.control(null),
         infoTimeout: this.fb.control(null),
         successTimeout: this.fb.control(null),
         warningTimeout: this.fb.control(null),
         criticalTimeout: this.fb.control(null),
         margin: this.fb.control(this.notificationsConfig.margin),
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
               closeIcon: this.configForm.get('closeControl').value,
               position: this.configForm.get('position').value,
               positionReference: this.configForm.get('positionReference').value
            };

            if (this.configForm.get('icon').value === 'custom') {
               notificationConfig.notificationIcon = this.configForm.get('customIcon').value;
            }

            this.notificationsConfig = Object.assign({}, this.notificationsConfig, notificationConfig);

            if (!this.getTimeoutToApply()) {
               this.configForm.get('closeControl').setValue(true, {emitEvent: false});
               this.configForm.get('closeControl').disable({emitEvent: false});
               this.notificationsConfig = {...this.notificationsConfig, closeIcon: true};
            } else if (!this.isShowing && !this.configForm.get('multiple').value) {
               this.configForm.get('closeControl').enable({emitEvent: false});
            }
         });

      this.configForm.get('multiple').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            if (val) {
               this.configForm.get('closeControl').setValue(true, {emitEvent: false});
               this.configForm.get('closeControl').disable({emitEvent: false});
               this.configForm.get('type').disable({emitEvent: false});
            } else {
               this.configForm.get('type').enable({emitEvent: false});
               this.configForm.get('closeControl').enable({emitEvent: false});
            }
         });

      this.configForm.get('showSpecificTimeouts').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe(() => {
            this.configForm.get('multipleTimeout').setValue(null, {emitEvent: false});
            this.configForm.get('infoTimeout').setValue(null, {emitEvent: false});
            this.configForm.get('successTimeout').setValue(null, {emitEvent: false});
            this.configForm.get('warningTimeout').setValue(null, {emitEvent: false});
            this.configForm.get('criticalTimeout').setValue(null, {emitEvent: false});

            this.notificationsConfig.multipleTimeout = null;
            this.notificationsConfig.infoTimeout = null;
            this.notificationsConfig.successTimeout = null;
            this.notificationsConfig.warningTimeout = null;
            this.notificationsConfig.criticalTimeout = null;
         });
   }

   public displayNotification(): void {
      this._notifications.addNotification({...this.notificationsConfig});
      this.isShowing = true;
      this.configForm.disable({emitEvent: false});
   }

   public displayVariousNotifications(): void {
      this._notifications.addNotification({
         ...this.notificationsConfig,
         notificationType: SdsNotificationType.SUCCESS
      });

      this._notifications.addNotification({
         ...this.notificationsConfig,
         notificationType: SdsNotificationType.CRITICAL
      });

      this._notifications.addNotification({
         ...this.notificationsConfig,
         notificationType: SdsNotificationType.WARNING
      });

      this.isShowing = true;
      this.configForm.disable({emitEvent: false});
   }

   public onCloseControlClick(): void {
      this.showCloseControlMessage = true;

      setTimeout(() => {
         this.showCloseControlMessage = false;
         this.cd.detectChanges();
      }, 2000);
   }

   public enableControls(): void {
      if (!this._notifications.getConsumingQueue()) {
         this.isShowing = false;
         this.configForm.enable();
         this.cd.detectChanges();
      }
   }

   public onTimeoutKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
         const timeout = parseInt(this.configForm.get('timeout').value, 10);
         this.showTimeoutChanged = true;
         this.notificationsConfig = Object.assign({}, this.notificationsConfig, {timeout: timeout});

         setTimeout(() => {
            this.showTimeoutChanged = false;
            this.cd.detectChanges();
         }, 2000);
      }
   }

   public onMultipleTimeoutKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
         const timeout = parseInt(this.configForm.get('multipleTimeout').value, 10);
         this.showMultipleTimeoutChanged = true;
         this.notificationsConfig = Object.assign({}, this.notificationsConfig, {multipleTimeout: timeout});

         setTimeout(() => {
            this.showMultipleTimeoutChanged = false;
            this.cd.detectChanges();
         }, 2000);
      }
   }

   public onInfoTimeoutKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
         const timeout = parseInt(this.configForm.get('infoTimeout').value, 10);
         this.showInfoTimeoutChanged = true;
         this.notificationsConfig = Object.assign({}, this.notificationsConfig, {infoTimeout: timeout});

         setTimeout(() => {
            this.showInfoTimeoutChanged = false;
            this.cd.detectChanges();
         }, 2000);
      }
   }

   public onSuccessTimeoutKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
         const timeout = parseInt(this.configForm.get('successTimeout').value, 10);
         this.showSuccessTimeoutChanged = true;
         this.notificationsConfig = Object.assign({}, this.notificationsConfig, {successTimeout: timeout});

         setTimeout(() => {
            this.showSuccessTimeoutChanged = false;
            this.cd.detectChanges();
         }, 2000);
      }
   }

   public onWarningTimeoutKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
         const timeout = parseInt(this.configForm.get('warningTimeout').value, 10);
         this.showWarningTimeoutChanged = true;
         this.notificationsConfig = Object.assign({}, this.notificationsConfig, {warningTimeout: timeout});

         setTimeout(() => {
            this.showWarningTimeoutChanged = false;
            this.cd.detectChanges();
         }, 2000);
      }
   }

   public onCriticalTimeoutKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
         const timeout = parseInt(this.configForm.get('criticalTimeout').value, 10);
         this.showCriticalTimeoutChanged = true;
         this.notificationsConfig = Object.assign({}, this.notificationsConfig, {criticalTimeout: timeout});

         setTimeout(() => {
            this.showCriticalTimeoutChanged = false;
            this.cd.detectChanges();
         }, 2000);
      }
   }

   public onMarginKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
         const margin = parseInt(this.configForm.get('margin').value, 10);
         this.showMarginChanged = true;
         this.notificationsConfig = Object.assign({}, this.notificationsConfig, {margin});

         setTimeout(() => {
            this.showMarginChanged = false;
            this.cd.detectChanges();
         }, 2000);
      }
   }

   public onWidthKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
         this.showWidthChanged = true;
         this.notificationsConfig = Object.assign({}, this.notificationsConfig, {maxWidth: this.configForm.get('maxWidth').value});

         setTimeout(() => {
            this.showWidthChanged = false;
            this.cd.detectChanges();
         }, 2000);
      }
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
