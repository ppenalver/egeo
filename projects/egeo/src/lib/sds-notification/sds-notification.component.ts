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
   ChangeDetectorRef,
   Component,
   ElementRef,
   EventEmitter,
   HostListener,
   Input,
   OnChanges,
   OnInit,
   Output,
   Renderer2,
   SimpleChanges,
   ViewChild
} from '@angular/core';
import {
   StNotificationDisplayOptions,
   StNotificationIcon,
   StNotificationPosition,
   StNotificationTriggerOptions,
   StNotificationType
} from './sds-notification.model';
import {Subject} from 'rxjs';
import {SdsNotificationService} from './sds-notification.service';
import {takeUntil} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
   selector: 'sds-notification',
   templateUrl: 'sds-notification.component.html',
   styleUrls: ['sds-notification.scss'],
   animations: [
      trigger('notificationFade', [
         state('*', style({opacity: 1})),
         state('void', style({opacity: 0})),
         transition(':enter', [
            style({opacity: 0}),
            animate(400, style({opacity: 1}))
         ]),
         transition(':leave', [
            style({opacity: 1}),
            animate(400, style({opacity: 0}))
         ])
      ])
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * @description {Component} [Foreground notifications]
 *
 * Foreground notifications are made to let the user know info about a process she is performing in real time.
 *
 * @example
 *
 * {html}
 *
 * ```
 * <sds-notification [config]="config" [hotRender]="false"></sds-notification>
 *
 * ```
 */


export class SdsNotificationComponent implements OnInit, OnChanges {

   /** @Input {hotRender} [hotRender=false'] If true, renders the notification directly and without animation */
   @Input() hotRender: boolean;

   /** @Input {config} [config={}'] Notification's config */
   @Input() config: StNotificationDisplayOptions;

   /** @output {autoClose} [EventEmitter] Event emitted when user clicks on close icon */
   @Output() autoClose: EventEmitter<void> = new EventEmitter();

   /** @output {close} [EventEmitter] Event emitted when notification was closed by timeout */
   @Output() close: EventEmitter<void> = new EventEmitter();

   @ViewChild('sdsNotification', {static: false}) stNotification: ElementRef;

   public showNotification: boolean;
   public message: string;
   public closeIcon: boolean;
   public notificationType: StNotificationType;
   public notificationIcon: StNotificationIcon | string;
   public position: StNotificationPosition;
   public positionReference: string;
   public timeout: number;
   public infoTimeout: number;
   public successTimeout: number;
   public warningTimeout: number;
   public criticalTimeout: number;
   public multipleTimeout: number;
   public margin: number;
   public maxWidth: string;
   public stNotificationType: typeof StNotificationType;
   public stNotificationIcon: typeof StNotificationIcon;

   private isMultiple: boolean;
   private visibilityTimeout: number;
   private componentDestroyed$: Subject<void>;

   @HostListener('mouseover')
   public onMouseOver(): void {
      if (this.visibilityTimeout) {
         clearTimeout(this.visibilityTimeout);
         this.visibilityTimeout = null;
      }
   }

   @HostListener('mouseout')
   public onMouseOut(): void {
      if (!this.hotRender) {
         const timeout = this.getTimeoutToApply(this.isMultiple);
         if (timeout) {
            this.setNotificationsTimeout(timeout);
         }
      }
   }

   constructor(
      private cd: ChangeDetectorRef,
      private elemRef: ElementRef,
      private renderer: Renderer2,
      private _notifications: SdsNotificationService
   ) {
      this.stNotificationIcon = StNotificationIcon;
      this.stNotificationType = StNotificationType;
      this.config = {};
      this.showNotification = false;
      this.hotRender = false;
      this.componentDestroyed$ = new Subject();
   }

   public ngOnInit(): void {
      this.processConfiguration();
      if (this.hotRender) {
         this.showNotification = true;
         this.cd.detectChanges();
      } else {
         this.initTriggerSubscription();
         this.initCancelTimeoutSubscription();
      }
   }

   public ngOnChanges(changes: SimpleChanges): void {
      if (this.hotRender && changes && changes.config && changes.config.currentValue) {
         this.processConfiguration(changes.config.currentValue);
      }
   }

   public onCloseClick(): void {
      if (!this.hotRender) {
         clearTimeout(this.visibilityTimeout);
         this.visibilityTimeout = null;
         this.removeNotification(this.close);
      } else {
         this.close.emit();
      }


   }

   private removeNotification(emitter: EventEmitter<void>): void {
      this.showNotification = false;
      this.cd.detectChanges();

      if (this.visibilityTimeout) {
         clearTimeout(this.visibilityTimeout);
         this.visibilityTimeout = null;
      }

      // This timeout is needed because we must wait until notification dissapear.
      setTimeout(() => {
         this._notifications.removeNotification();
         emitter.emit();
      }, 400);
   }

   private initTriggerSubscription(): void {
      this._notifications.trigger$
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe(this.triggerNotification.bind(this));
   }

   private initCancelTimeoutSubscription(): void {
      this._notifications.cancelTimeout$
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe(() => {
            this.isMultiple = true;

            const timeout = this.getTimeoutToApply(this.isMultiple);
            clearTimeout(this.visibilityTimeout);
            this.visibilityTimeout = null;

            if (timeout) {
               this.setNotificationsTimeout(timeout);
            }
         });
   }

   private triggerNotification(triggerOptions: StNotificationTriggerOptions): void {
      const {notificationOptions, isMultiple} = triggerOptions;
      this.isMultiple = isMultiple;
      this.showNotification = true;
      this.cd.detectChanges();

      if (!!notificationOptions) {
         this.processConfiguration(notificationOptions);
      }

      const timeoutToApply = this.getTimeoutToApply(this.isMultiple);
      if (timeoutToApply) {
         this.setNotificationsTimeout(timeoutToApply);
      }
   }

   private setNotificationsTimeout(timeout: number): void {
      this.visibilityTimeout = <any>setTimeout(() => {
         this.removeNotification(this.autoClose);
      }, timeout);
   }

   private setNotificationPosition(): void {
      const notificationClientRect = this.stNotification.nativeElement.getBoundingClientRect();
      const referenceElement = document.querySelector(this.positionReference);
      const referenceClientRect = (referenceElement as Element).getBoundingClientRect();
      const [verticalPosition, horizontalPosition] = this.position.split('_');
      let resizedHeight = false;
      let resizedWidth = false;

      if (notificationClientRect.height >= referenceClientRect.height) {
         const width = referenceClientRect.height - (this.margin * 2);
         this.renderer.setStyle(this.stNotification.nativeElement, 'height', width + 'px');
         resizedHeight = true;
      }

      if (notificationClientRect.width >= referenceClientRect.width) {
         const width = referenceClientRect.width - (this.margin * 2);
         this.renderer.setStyle(this.stNotification.nativeElement, 'width', width + 'px');
         resizedWidth = true;
      }

      const topValue = this.getTopValue(verticalPosition, referenceClientRect, resizedHeight);
      const leftValue = this.getLeftValue(horizontalPosition, referenceClientRect, resizedWidth);
      this.renderer.setStyle(this.stNotification.nativeElement, 'top', topValue + 'px');
      this.renderer.setStyle(this.stNotification.nativeElement, 'left', leftValue + 'px');
   }

   private getTopValue(position: string, referenceClientRect: ClientRect, resized: boolean): number {
      const stNotification = this.stNotification.nativeElement;
      const stNotificationClientRect = stNotification.getBoundingClientRect() as ClientRect;
      const height = referenceClientRect.height > window.innerHeight ? window.innerHeight : referenceClientRect.height;
      let topValue = 0;

      if (position === 'top') {
         topValue = referenceClientRect.top + this.margin;
      } else if (position === 'bottom') {
         topValue = referenceClientRect.bottom - stNotificationClientRect.height - this.margin;
      } else if (position === 'center') {
         topValue = referenceClientRect.top + (height / 2) - (stNotificationClientRect.height / 2);

         if (!resized) {
            topValue += this.margin;
         }
      }

      return topValue;
   }

   private getLeftValue(position: string, referenceClientRect: ClientRect, resized: boolean): number {
      const stNotification = this.stNotification.nativeElement;
      const stNotificationClientRect = stNotification.getBoundingClientRect() as ClientRect;
      const windowWidth = window.innerWidth - (this.margin * 2);
      const width = referenceClientRect.width > window.innerWidth ? windowWidth : referenceClientRect.width;
      let leftValue = 0;

      if (position === 'left') {
         leftValue = referenceClientRect.left + this.margin;
      } else if (position === 'right') {
         leftValue = referenceClientRect.right - stNotificationClientRect.width - this.margin;
      } else if (position === 'center') {
         leftValue = referenceClientRect.left + (width / 2) - (stNotificationClientRect.width / 2);

         if (!resized) {
            leftValue += this.margin;
         }
      }

      return leftValue;
   }

   private processConfiguration(config: StNotificationDisplayOptions = this.config): void {
      const defaultConfig = this._notifications.DEFAULT_CONFIG;

      this.message = config.message ? config.message : defaultConfig.message;
      this.notificationType = config.notificationType ? config.notificationType : defaultConfig.notificationType;
      this.notificationIcon = config.notificationIcon ? config.notificationIcon : defaultConfig.notificationIcon;
      this.closeIcon = !!config.closeIcon;
      this.position = config.position ? config.position : defaultConfig.position;
      this.positionReference = config.positionReference ? config.positionReference : defaultConfig.positionReference;
      this.margin = config.margin ? config.margin : defaultConfig.margin;
      this.maxWidth = config.maxWidth ? config.maxWidth : defaultConfig.maxWidth;

      this.timeout = config.timeout ? config.timeout : defaultConfig.timeout;
      this.infoTimeout = config.infoTimeout ? config.infoTimeout : this.timeout;
      this.successTimeout = config.successTimeout ? config.successTimeout : this.timeout;
      this.warningTimeout = config.warningTimeout ? config.warningTimeout : this.timeout;
      this.criticalTimeout = config.criticalTimeout ? config.criticalTimeout : 0;
      this.multipleTimeout = config.multipleTimeout ? config.multipleTimeout : 0;

      this.cd.detectChanges();

      if (!this.hotRender && this.stNotification) {
         this.renderer.setStyle(this.stNotification.nativeElement, 'max-width', this.maxWidth);
         this.renderer.removeStyle(this.stNotification.nativeElement, 'width');
         this.setNotificationPosition();
      }
   }

   private getTimeoutToApply(isMultiple: boolean): number {
      if (isMultiple) {
         return this.multipleTimeout;
      }

      const auxMap = {
         [StNotificationType.INFO]: this.infoTimeout,
         [StNotificationType.SUCCESS]: this.successTimeout,
         [StNotificationType.WARNING]: this.warningTimeout,
         [StNotificationType.CRITICAL]: this.criticalTimeout
      };
      return auxMap[this.notificationType];
   }
}


