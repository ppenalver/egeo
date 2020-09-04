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
   StNotificationState,
   StNotificationTriggerOptions,
   StNotificationType
} from './st-foreground-notifications.model';
import {Subject} from 'rxjs';
import {StForegroundNotificationsService} from './st-foreground-notifications.service';
import {takeUntil} from 'rxjs/operators';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';

@Component({
   selector: 'st-foreground-notifications',
   templateUrl: 'st-foreground-notifications.html',
   styleUrls: ['st-foreground-notifications.scss'],
   animations: [
      trigger('notificationFade', [
         state('show', style({opacity: 1})),
         state('hot_render', style({opacity: 1})),
         state('hide_close', style({opacity: 0})),
         state('hide_autoclose', style({opacity: 0})),
         transition('hide_close => show, hide_autoclose => show', [
            style({opacity: 0}),
            animate(400, style({opacity: 1}))
         ]),
         transition('show => hide_close, show => hide_autoclose', [
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
 * <st-foreground-notifications [config]="config" [hotRender]="false"></st-foreground-notifications>
 *
 * ```
 */


export class StForegroundNotificationsComponent implements OnInit, OnChanges {

   /** @Input {hotRender} [hotRender=false'] If true, renders the notification directly and without animation */
   @Input() hotRender: boolean;

   /** @Input {config} [config={}'] Notification's config */
   @Input() config: StNotificationDisplayOptions;

   /** @output {autoClose} [EventEmitter] Event emitted when user clicks on close icon */
   @Output() autoClose: EventEmitter<boolean> = new EventEmitter();

   /** @output {close} [EventEmitter] Event emitted when notification was closed by timeout */
   @Output() close: EventEmitter<boolean> = new EventEmitter();

   @ViewChild('stNotification', {static: true}) stNotification: ElementRef;

   public message: string;
   public closeIcon: boolean;
   public notificationType: StNotificationType;
   public notificationIcon: StNotificationIcon | string;
   public position: StNotificationPosition;
   public positionReference: string;
   public infoTimeout: number;
   public successTimeout: number;
   public warningTimeout: number;
   public criticalTimeout: number;
   public multipleTimeout: number;
   public margin: number;
   public width: string;
   public showNotification: boolean;
   public notificationState: StNotificationState;
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
      private _notifications: StForegroundNotificationsService
   ) {
      this.stNotificationIcon = StNotificationIcon;
      this.stNotificationType = StNotificationType;
      this.config = {};
      this.hotRender = false;
      this.showNotification = false;
      this.notificationState = StNotificationState.HIDE_CLOSE;
      this.componentDestroyed$ = new Subject();
   }

   public ngOnInit(): void {
      this.processConfiguration();
      if (this.hotRender) {
         this.notificationState = StNotificationState.HOT_RENDER;
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
         this.notificationState = StNotificationState.HIDE_CLOSE;
      } else {
         this.close.emit();
      }
   }

   public onNotificationStateChanged(event: AnimationEvent): void {
      if (event.toState === StNotificationState.HIDE_CLOSE || event.toState === StNotificationState.HIDE_AUTOCLOSE) {
         this._notifications.removeNotification();
         this.processConfiguration(this.config);
      }

      if (event.toState === StNotificationState.HIDE_CLOSE) {
         this.close.emit();
      }

      if (event.toState === StNotificationState.HIDE_AUTOCLOSE) {
         this.autoClose.emit();
      }
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
      this.notificationState = StNotificationState.SHOW;
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
         this.notificationState = StNotificationState.HIDE_AUTOCLOSE;
         this.cd.detectChanges();
      }, timeout);
   }

   private setNotificationPosition(): void {
      const referenceElement = document.querySelector(this.positionReference);
      const [verticalPosition, horizontalPosition] = this.position.split('_');
      const topValue = this.getTopValue(verticalPosition, referenceElement);
      const leftValue = this.getLeftValue(horizontalPosition, referenceElement);
      this.renderer.setStyle(this.stNotification.nativeElement, 'top', (this.margin + topValue) + 'px');
      this.renderer.setStyle(this.stNotification.nativeElement, 'left', (this.margin + leftValue) + 'px');
   }

   private getTopValue(position: string, reference: Element): number {
      const stNotification = this.stNotification.nativeElement;
      const referenceClientRect = (reference as Element).getBoundingClientRect();
      const stNotificationClientRect = stNotification.getBoundingClientRect() as ClientRect;
      const height = referenceClientRect.height > window.innerHeight ? window.innerHeight : referenceClientRect.height;

      if (position === 'top') {
         return referenceClientRect.top;
      } else if (position === 'bottom') {
         return referenceClientRect.bottom - stNotificationClientRect.height;
      } else if (position === 'center') {
         return referenceClientRect.top + (height / 2) - stNotificationClientRect.height;
      }
   }

   private getLeftValue(position: string, reference: Element): number {
      const stNotification = this.stNotification.nativeElement;
      const referenceClientRect = (reference as Element).getBoundingClientRect();
      const stNotificationClientRect = stNotification.getBoundingClientRect() as ClientRect;
      const width = referenceClientRect.width > window.innerWidth ? window.innerWidth : referenceClientRect.width;

      if (position === 'left') {
         return referenceClientRect.left;
      } else if (position === 'right') {
         return referenceClientRect.right - stNotificationClientRect.width;
      } else if (position === 'center') {
         return referenceClientRect.left + (width / 2) - (stNotificationClientRect.width / 2);
      }
   }

   private processConfiguration(config: StNotificationDisplayOptions = this.config): void {
      const defaultConfig = this._notifications.DEFAULT_CONFIG;

      this.message = config.message ? config.message : defaultConfig.message;
      this.notificationType = config.notificationType ? config.notificationType : defaultConfig.notificationType;
      this.notificationIcon = config.notificationIcon ? config.notificationIcon : defaultConfig.notificationIcon;
      this.closeIcon = config.closeIcon ? config.closeIcon : defaultConfig.closeIcon;
      this.position = config.position ? config.position : defaultConfig.position;
      this.positionReference = config.positionReference ? config.positionReference : defaultConfig.positionReference;
      this.infoTimeout = config.infoTimeout ? config.infoTimeout : defaultConfig.infoTimeout;
      this.successTimeout = config.successTimeout ? config.successTimeout : defaultConfig.successTimeout;
      this.warningTimeout = config.warningTimeout ? config.warningTimeout : defaultConfig.warningTimeout;
      this.criticalTimeout = config.criticalTimeout ? config.criticalTimeout : defaultConfig.criticalTimeout;
      this.multipleTimeout = config.multipleTimeout ? config.multipleTimeout : defaultConfig.multipleTimeout;
      this.margin = config.margin ? config.margin : defaultConfig.margin;
      this.width = config.width ? config.width : defaultConfig.width;

      if (!this.hotRender) {
         this.renderer.setStyle(this.stNotification.nativeElement, 'max-width', this.width);
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


