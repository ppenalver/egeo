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
import {
   ChangeDetectionStrategy,
   Component,
   ElementRef,
   EventEmitter,
   HostListener,
   Input,
   OnChanges,
   Output,
   Renderer2,
   SimpleChanges,
   ViewChild,
   HostBinding
} from '@angular/core';
import {
   SdsNotificationDisplayOptions,
   SdsNotificationIcon,
   SdsNotificationType
} from './sds-notification.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
   selector: 'sds-notification',
   templateUrl: 'sds-notification.component.html',
   styleUrls: ['sds-notification.component.scss'],
   animations: [
      trigger('notificationFade', [
         state('*', style({ opacity: 1 })),
         state('void', style({ opacity: 0 })),
         transition(':enter', [
            style({ opacity: 0 }),
            animate(400, style({ opacity: 1 }))
         ]),
         transition(':leave', [
            style({ opacity: 1 }),
            animate(400, style({ opacity: 0 }))
         ])
      ])
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * @description {Component} [Sds notification]
 *
 * Sds notifications are made to let the user know info about a process she is performing in real time.
 *
 * @example
 *
 * {html}
 *
 * ```
 * <sds-notification [config]="config"></sds-notification>
 *
 * ```
 */


export class SdsNotificationComponent implements OnChanges {

   /** @Input {config} [config={}'] Notification's config */
   @Input() config: SdsNotificationDisplayOptions = {};

   /** @Input {disableAnimations} [isDisabled=false'] If true, disables animations */
   @HostBinding('@.disabled')
   @Input()
   disableAnimations: boolean = false;

   /** @output {close} [EventEmitter] Event emitted when notification was closed */
   @Output() close: EventEmitter<void> = new EventEmitter();

   @ViewChild('sdsNotification', { static: true }) stNotification: ElementRef;

   public message: string;
   public closeIcon: boolean;
   public notificationType: SdsNotificationType;
   public notificationIcon: SdsNotificationIcon | string;
   public notificationTimeout: number;
   public maxWidth: string;

   public SdsNotificationType: typeof SdsNotificationType = SdsNotificationType;
   public SdsNotificationIcon: typeof SdsNotificationIcon = SdsNotificationIcon;

   public static readonly DEFAULT_CONFIG: SdsNotificationDisplayOptions = {
      message: '',
      notificationType: SdsNotificationType.INFO,
      notificationIcon: SdsNotificationIcon.DEFAULT,
      closeIcon: true,
      maxWidth: '50vw',
      timeout: 6000
   };

   private _visibilityTimeout: number;

   @HostBinding('@notificationFade') notificationAnimation: any;


   @HostListener('mouseover')
   public onMouseOver(): void {
      if (this._visibilityTimeout) {
         clearTimeout(this._visibilityTimeout);
         this._visibilityTimeout = null;
      }
   }

   @HostListener('mouseout')
   public onMouseOut(): void {
      if (!this.disableAnimations) {
         const timeout = this._getTimeoutToApply();
         if (timeout) {
            this._setNotificationsTimeout(timeout);
         }
      }
   }

   constructor(
      private renderer: Renderer2
   ) { }

   public ngOnChanges(changes: SimpleChanges): void {
      if (changes && changes.config && changes.config.currentValue) {
         this._processConfiguration(changes.config.currentValue);
         this._initCancelTimeoutSubscription();
      }
   }

   public removeNotification(): void {
      if (this._visibilityTimeout) {
         clearTimeout(this._visibilityTimeout);
         this._visibilityTimeout = null;
      }
      this.close.emit();
   }

   private _initCancelTimeoutSubscription(): void {
      const timeout = this._getTimeoutToApply();
      clearTimeout(this._visibilityTimeout);
      this._visibilityTimeout = null;

      if (timeout) {
         this._setNotificationsTimeout(timeout);
      }
   }

   private _setNotificationsTimeout(timeout: number): void {
      this._visibilityTimeout = <any>setTimeout(() => {
         this.removeNotification();
      }, timeout);
   }

   private _processConfiguration(config: SdsNotificationDisplayOptions = this.config): void {
      const defaultConfig = SdsNotificationComponent.DEFAULT_CONFIG;

      this.message = config?.message ? config.message : defaultConfig.message;
      this.notificationType = config?.notificationType ? config.notificationType : defaultConfig.notificationType;
      this.notificationIcon = config?.notificationIcon ? config.notificationIcon : defaultConfig.notificationIcon;
      this.closeIcon = Boolean(config?.closeIcon);
      this.maxWidth = config?.maxWidth ? config.maxWidth : defaultConfig.maxWidth;

      this.notificationTimeout = config?.timeout ? config.timeout : defaultConfig.timeout;

      const auxMap = {
         [SdsNotificationType.INFO]: config?.infoTimeout ? config.infoTimeout : this.notificationTimeout,
         [SdsNotificationType.SUCCESS]: config?.successTimeout ? config.successTimeout : this.notificationTimeout,
         [SdsNotificationType.WARNING]: config?.warningTimeout ? config.warningTimeout : this.notificationTimeout,
         [SdsNotificationType.CRITICAL]: config?.criticalTimeout ? config.criticalTimeout : this.notificationTimeout
      };

      this.notificationTimeout = auxMap[this.notificationType];

      this.renderer.setStyle(this.stNotification.nativeElement, 'max-width', this.maxWidth);
      this.renderer.removeStyle(this.stNotification.nativeElement, 'width');

   }

   private _getTimeoutToApply(): number {
      const timeout: number = this.notificationTimeout;
      if (!timeout) {
         this.closeIcon = true;
      }
      return timeout;
   }
}


