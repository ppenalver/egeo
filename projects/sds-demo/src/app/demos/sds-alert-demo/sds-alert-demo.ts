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
import {SdsAlertConfig, SdsAlertType, SdsAlertIcon, SdsAlertPosition} from '../../../../../egeo/src/lib/sds-alert/sds-alert.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {SdsAlertService} from '../../../../../egeo/src/lib/sds-alert/sds-alert.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
   selector: 'sds-alert-demo',
   templateUrl: 'sds-alert-demo.html',
   styleUrls: ['./sds-alert-demo.scss'],
   animations: [
      trigger('fade', [
         state('void', style({opacity: 0})),
         state('*', style({opacity: 1})),
         transition(':enter', [animate(300)]),
         transition(':leave', [animate(300)])
      ])
   ]
})
export class SdsAlertDemoComponent {

   public configDoc: any = {
      html: 'demo/sds-alert-demo/sds-alert-demo.html',
      ts: 'demo/sds-alert-demo/sds-alert-demo.ts',
      component: 'lib/sds-alert/sds-alert.component.ts'
   };

   public configForm: FormGroup;
   public disableButtons: boolean = false;
   public typeOptions: any = [
      {
         label: 'Info (default)',
         value: SdsAlertType.INFO
      },
      {
         label: 'Success',
         value: SdsAlertType.SUCCESS
      },
      {
         label: 'Warning',
         value: SdsAlertType.WARNING
      },
      {
         label: 'Critical',
         value: SdsAlertType.CRITICAL
      },
      {
         label: 'Connection lost',
         value: SdsAlertType.CONNECTION_LOST
      }
   ];

   public iconOptions: any = [
      {
         label: 'Default icon',
         value: SdsAlertIcon.DEFAULT
      },
      {
         label: 'Custom icon',
         value: 'custom'
      },
      {
         label: 'No icon',
         value: SdsAlertIcon.NONE
      }
   ];
   public activeIconOption: SdsAlertType | string = SdsAlertIcon.DEFAULT;

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

   public actionOptions: any = [
      {
         label: 'No actions',
         value: 'no-actions'
      },
      {
         label: 'One action',
         value: 'one-action'
      },
      {
         label: 'Two actions',
         value: 'two-actions'
      }
   ];

   public positionOptions: any = [
      {
         label: 'top left',
         value: SdsAlertPosition.TOP_LEFT
      },
      {
         label: 'top center',
         value: SdsAlertPosition.TOP_CENTER
      },
      {
         label: 'top right',
         value: SdsAlertPosition.TOP_RIGHT
      },
      {
         label: 'center left',
         value: SdsAlertPosition.CENTER_LEFT
      },
      {
         label: 'center center',
         value: SdsAlertPosition.CENTER_CENTER
      },
      {
         label: 'center right',
         value: SdsAlertPosition.CENTER_RIGHT
      },
      {
         label: 'bottom left',
         value: SdsAlertPosition.BOTTOM_LEFT
      },
      {
         label: 'bottom center',
         value: SdsAlertPosition.BOTTOM_CENTER
      },
      {
         label: 'bottom right',
         value: SdsAlertPosition.BOTTOM_RIGHT
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
   public alertsConfig: SdsAlertConfig;
   public showMessage: boolean = false;
   public message: string;
   public messageTimeout: any;
   public simulateConnection: FormControl;

   private isShowing: boolean = false;
   private componentDestroyed$: Subject<void>;

   constructor(private cd: ChangeDetectorRef, private _alerts: SdsAlertService, private fb: FormBuilder) {
      this.componentDestroyed$ = new Subject();
      this.alertsConfig = {...this._alerts.DEFAULT_CONFIG};
      this.alertsConfig.title = 'Alert title';
      this.alertsConfig.message = 'This space is reserved to display a detailed info about why this notification is important.';
      this.alertsConfig.positionReference = '#main';
      this.configForm = this.fb.group({
         alertType: this.fb.control(this.alertsConfig.alertType),
         title: this.fb.control(this.alertsConfig.title),
         message: this.fb.control(this.alertsConfig.message),
         action: this.fb.control('no-actions'),
         icon: this.fb.control(this.alertsConfig.alertIcon),
         customIcon: this.fb.control('icon-mute'),
         closeControl: this.fb.control(this.alertsConfig.closeIcon),
         position: this.fb.control(this.alertsConfig.position),
         positionReference: this.fb.control(this.alertsConfig.positionReference),
         timeout: this.fb.control(this.alertsConfig.timeout),
         multipleTimeout: this.fb.control(null),
         connectionLostTimeout: this.fb.control(null),
         infoTimeout: this.fb.control(null),
         successTimeout: this.fb.control(null),
         warningTimeout: this.fb.control(null),
         criticalTimeout: this.fb.control(null),
         margin: this.fb.control(this.alertsConfig.margin),
         showSpecificTimeouts: this.fb.control(false),
         multiple: this.fb.control(false)
      });
      this.simulateConnection = new FormControl(false);
      this.simulateConnection.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((v) => {
            if (v) {
               this.disableButtons = true;
               this.configForm.disable();
               this._alerts.addAlert({
                  alertType: SdsAlertType.CONNECTION_LOST,
                  title: this.alertsConfig.title,
                  message: this.alertsConfig.message,
                  alertIcon: this.alertsConfig.alertIcon,
                  closeIcon: this.alertsConfig.closeIcon,
                  position: this.alertsConfig.position,
                  positionReference: this.alertsConfig.positionReference,
                  timeout: this.alertsConfig.timeout,
                  multipleTimeout: this.alertsConfig.multipleTimeout,
                  infoTimeout: this.alertsConfig.infoTimeout,
                  successTimeout: this.alertsConfig.successTimeout,
                  warningTimeout: this.alertsConfig.warningTimeout,
                  criticalTimeout: this.alertsConfig.criticalTimeout,
                  margin: this.alertsConfig.margin
               });
            } else {
               this._alerts.cancelCurrentAlert();
               this.disableButtons = false;
               this.configForm.enable();
            }
         });

      this.configForm.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((e) => {
            const alertConfig: SdsAlertConfig = {
               alertType: this.configForm.get('alertType').value,
               title: this.configForm.get('title').value,
               message: this.configForm.get('message').value,
               alertIcon: this.configForm.get('icon').value,
               closeIcon: this.configForm.get('closeControl').value,
               position: this.configForm.get('position').value,
               positionReference: this.configForm.get('positionReference').value
            };

            if (this.configForm.get('icon').value === 'custom') {
               alertConfig.alertIcon = this.configForm.get('customIcon').value;
            }

            this.alertsConfig = Object.assign({}, this.alertsConfig, alertConfig);

            if (!this.getTimeoutToApply()) {
               if (this.configForm.get('alertType').value !== SdsAlertType.CONNECTION_LOST) {
                  this.configForm.get('closeControl').setValue(true, {emitEvent: false});
               }
               this.configForm.get('closeControl').disable({emitEvent: false});
               this.alertsConfig = {...this.alertsConfig, closeIcon: true};
            } else if (this.configForm.get('alertType').value !== SdsAlertType.CONNECTION_LOST && !this.isShowing && !this.configForm.get('multiple').value) {
               this.configForm.get('closeControl').enable({emitEvent: false});
            }
         });

      this.configForm.get('multiple').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            if (val) {
               this.configForm.get('alertType').disable({emitEvent: false});

               this.configForm.get('closeControl').setValue(true, {emitEvent: false});
               this.configForm.get('closeControl').disable({emitEvent: false});
            } else {
               this.configForm.get('alertType').enable({emitEvent: false});
               this.configForm.get('closeControl').enable({emitEvent: false});
            }
         });

      this.configForm.get('action').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            this.alertsConfig.actionLeft = null;
            this.alertsConfig.actionLeftLabel = null;
            this.alertsConfig.actionRight = null;
            this.alertsConfig.actionRightLabel = null;

            if (val === 'one-action') {
               this.alertsConfig.actionLeft = () => { this.onClick('Action left pressed...'); };
               this.alertsConfig.actionLeftLabel = 'Action';
            } else if (val === 'two-actions') {
               this.alertsConfig.actionLeft = () => { this.onClick('Action left pressed...'); };
               this.alertsConfig.actionLeftLabel = 'Action';
               this.alertsConfig.actionRight = () => { this.onClick('Action right pressed...'); };
               this.alertsConfig.actionRightLabel = 'Action';
            }
         });

      this.configForm.get('alertType').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            if (val === SdsAlertType.CONNECTION_LOST) {
               this.configForm.get('action').setValue('no-actions', {emitEvent: false});
               this.configForm.get('closeControl').setValue(false, {emitEvent: false});
               this.configForm.get('closeControl').disable({emitEvent: false});
               this.configForm.get('action').disable({emitEvent: false});
               this.configForm.get('multiple').disable({emitEvent: false});
               this.configForm.get('multiple').setValue(false, {emitEvent: false});
            } else {
               this.configForm.get('closeControl').enable({emitEvent: false});
               this.configForm.get('action').enable({emitEvent: false});
               this.configForm.get('multiple').enable({emitEvent: false});
            }
         });

      this.configForm.get('showSpecificTimeouts').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe(() => {
            this.configForm.get('multipleTimeout').setValue(null);
            this.configForm.get('infoTimeout').setValue(null);
            this.configForm.get('successTimeout').setValue(null);
            this.configForm.get('warningTimeout').setValue(null);
            this.configForm.get('criticalTimeout').setValue(null);

            this.alertsConfig.multipleTimeout = null;
            this.alertsConfig.infoTimeout = null;
            this.alertsConfig.successTimeout = null;
            this.alertsConfig.warningTimeout = null;
            this.alertsConfig.criticalTimeout = null;
         });
   }

   public displayAlert(): void {
      this._alerts.addAlert({...this.alertsConfig});

      this.isShowing = true;
      this.configForm.disable({ emitEvent: false });
   }

   public displayVariousAlerts(): void {
      this._alerts.addAlert({
         ...this.alertsConfig,
         alertType: SdsAlertType.SUCCESS
      });

      this._alerts.addAlert({
         ...this.alertsConfig,
         alertType: SdsAlertType.CRITICAL
      });

      this._alerts.addAlert({
         ...this.alertsConfig,
         alertType: SdsAlertType.WARNING
      });

      this.isShowing = true;
      this.configForm.disable({ emitEvent: false});

   }

   public onClick(message: string): void {
      this.message = message;
      this.showMessage = true;

      clearTimeout(this.messageTimeout);
      this.messageTimeout = null;
      this.messageTimeout = setTimeout(() => {
         if (this.messageTimeout) {
            this.showMessage = false;
            this.cd.detectChanges();
         }
      }, 2000);
   }

   public enableControls(): void {
      if (!this._alerts.getConsumingQueue()) {
         this.isShowing = false;
         this.configForm.enable({ emitEvent: false });
         this.cd.detectChanges();
      }
   }

   public onTimeoutKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
         const timeout = parseInt(this.configForm.get('timeout').value, 10);
         this.showTimeoutChanged = true;
         this.alertsConfig = Object.assign({}, this.alertsConfig, {timeout: timeout});

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
         this.alertsConfig = Object.assign({}, this.alertsConfig, {multipleTimeout: timeout});

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
         this.alertsConfig = Object.assign({}, this.alertsConfig, {infoTimeout: timeout});

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
         this.alertsConfig = Object.assign({}, this.alertsConfig, {successTimeout: timeout});

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
         this.alertsConfig = Object.assign({}, this.alertsConfig, {warningTimeout: timeout});

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
         this.alertsConfig = Object.assign({}, this.alertsConfig, {criticalTimeout: timeout});

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
         this.alertsConfig = Object.assign({}, this.alertsConfig, {margin});

         setTimeout(() => {
            this.showMarginChanged = false;
            this.cd.detectChanges();
         }, 2000);
      }
   }

   public getTimeoutToApply(): number {
      const alertType = this.configForm.get('alertType').value;
      const alertTimeout = this.configForm.get('timeout').value;
      const infoTimeout = this.configForm.get('infoTimeout').value;
      const successTimeout = this.configForm.get('successTimeout').value;
      const warningTimeout = this.configForm.get('warningTimeout').value;
      const criticalTimeout = this.configForm.get('criticalTimeout').value;

      const auxMap = {
         [SdsAlertType.INFO]: infoTimeout ?? alertTimeout,
         [SdsAlertType.SUCCESS]: successTimeout ?? alertTimeout,
         [SdsAlertType.WARNING]: warningTimeout ?? alertTimeout,
         [SdsAlertType.CRITICAL]: criticalTimeout ?? 0,
         [SdsAlertType.CONNECTION_LOST]: 0
      };

      return auxMap[alertType];
   }
}
