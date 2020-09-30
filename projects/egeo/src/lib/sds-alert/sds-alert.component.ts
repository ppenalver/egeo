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
   Output,
   Renderer2,
   SimpleChanges,
   ViewChild
} from '@angular/core';
import {
   SdsAlertConfig,
   SdsAlertIcon,
   SdsAlertPosition,
   SdsAlertTriggerOptions,
   SdsAlertType
} from '../sds-alert/sds-alert.model';
import {Subject} from 'rxjs';
import {SdsAlertService} from '../sds-alert/sds-alert.service';
import {takeUntil} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
   selector: 'sds-alert',
   templateUrl: './sds-alert.component.html',
   styleUrls: ['./sds-alert.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   animations: [
      trigger('alertFade', [
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
   ]
})
/**
 * @description {Component} [Alerts]
 *
 * Alerts are made to let the user know errors or information about he is trying to do.
 *
 * @model
 *
 *  [Alert] {./sds-alert.model.ts#StAlert}
 *
 * @example
 *
 * {html}
 *
 * ```
 * <sds-alert [showInConsole]="true"></sds-alert>
 *
 * ```
 */
export class SdsAlertComponent {
   /** @Input {isDisabled} [isDisabled=false'] If true, disables animation and positioning */
   @Input() isDisabled: boolean;

   /** @Input {hotRender} [hotRender=false'] If true, enables hot render */
   @Input() hotRender: boolean;

   /** @Input {config} [config={}'] Alert's config */
   @Input() config: SdsAlertConfig;

   /** @output {autoClose} [EventEmitter] Event emitted when user clicks on close icon */
   @Output() autoClose: EventEmitter<void> = new EventEmitter();

   /** @output {close} [EventEmitter] Event emitted when alert was closed by timeout */
   @Output() close: EventEmitter<void> = new EventEmitter();

   @ViewChild('sdsAlert', {static: false}) sdsAlert: ElementRef;

   public showAlertHtml: boolean;
   public title: string;
   public message: string;
   public actionLeftLabel: string;
   public actionLeft: Function;
   public actionRight: Function;
   public actionRightLabel: string;
   public closeIcon: boolean;
   public alertType: SdsAlertType;
   public alertIcon: SdsAlertIcon | string;
   public position: SdsAlertPosition;
   public positionReference: string;
   public alertTimeout: number;
   public timeout: number;
   public infoTimeout: number;
   public successTimeout: number;
   public warningTimeout: number;
   public criticalTimeout: number;
   public multipleTimeout: number;
   public margin: number;
   public sdsAlertType: typeof SdsAlertType;
   public sdsAlertIcon: typeof SdsAlertIcon;

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
      if (!this.isDisabled) {
         const timeout = this.getTimeoutToApply(this.isMultiple);
         if (timeout) {
            this.setAlertsTimeout(timeout);
         }
      }
   }

   constructor(
      private _cd: ChangeDetectorRef,
      private _elemRef: ElementRef,
      private _renderer: Renderer2,
      private _alerts: SdsAlertService
   ) {
      this.sdsAlertIcon = SdsAlertIcon;
      this.sdsAlertType = SdsAlertType;
      this.config = {};
      this.showAlertHtml = false;
      this.hotRender = false;
      this.isDisabled = false;
      this.componentDestroyed$ = new Subject();
   }

   public ngOnInit(): void {
      this.processConfiguration();
      if (this.isDisabled) {
         this.showAlertHtml = true;
         this._cd.detectChanges();
      } else {
         this.initTriggerSubscription();
         this.initCancelTimeoutSubscription();
         this.initRemoveCurrentAlertSubscription();
      }
   }

   public ngOnChanges(changes: SimpleChanges): void {
      if (this.hotRender && changes && changes.config && changes.config.currentValue) {
         this.processConfiguration(changes.config.currentValue);
      }
   }

   public onCloseClick(): void {
      if (!this.isDisabled) {
         clearTimeout(this.visibilityTimeout);
         this.visibilityTimeout = null;
         this.removeAlert(this.close);
      } else {
         this.close.emit();
      }


   }

   private removeAlert(emitter?: EventEmitter<void>): void {
      this.showAlertHtml = false;
      this._cd.detectChanges();

      if (this.visibilityTimeout) {
         clearTimeout(this.visibilityTimeout);
         this.visibilityTimeout = null;
      }

      // This timeout is needed because we must wait until alert dissapear.
      setTimeout(() => {
         this._alerts.removeAlert();

         if (emitter) {
            emitter.emit();
         }
      }, 400);
   }

   private initTriggerSubscription(): void {
      this._alerts.trigger$
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe(this.triggerAlert.bind(this));
   }

   private initCancelTimeoutSubscription(): void {
      this._alerts.cancelTimeout$
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe(() => {
            this.isMultiple = true;

            const timeout = this.getTimeoutToApply(this.isMultiple);
            clearTimeout(this.visibilityTimeout);
            this.visibilityTimeout = null;

            if (timeout) {
               this.setAlertsTimeout(timeout);
            }
         });
   }

   private initRemoveCurrentAlertSubscription(): void {
      this._alerts.cancelCurrentAlert$
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe(() => {
            if (this.showAlertHtml) {
               this.removeAlert();
            }
         });
   }

   private triggerAlert(triggerOptions: SdsAlertTriggerOptions): void {
      const {alertOptions, isMultiple} = triggerOptions;
      this.isMultiple = isMultiple;
      this.showAlertHtml = true;
      this._cd.detectChanges();

      if (Boolean(alertOptions)) {
         this.processConfiguration(alertOptions);
      }

      const timeoutToApply = this.getTimeoutToApply(this.isMultiple);
      if (timeoutToApply) {
         this.setAlertsTimeout(timeoutToApply);
      }
   }

   private setAlertsTimeout(timeout: number): void {
      this.visibilityTimeout = <any>setTimeout(() => {
         this.removeAlert(this.autoClose);
      }, timeout);
   }

   private setAlertPosition(): void {
      const alertClientRect: ClientRect = this.sdsAlert.nativeElement.getBoundingClientRect();
      const referenceElement: HTMLElement = document.querySelector(this.positionReference);
      const referenceClientRect: ClientRect = (referenceElement as Element).getBoundingClientRect();
      const [verticalPosition, horizontalPosition]: string[] = this.position.split('_');
      let resizedHeight = false;
      let resizedWidth = false;

      if (alertClientRect.height >= referenceClientRect.height) {
         const width = referenceClientRect.height - (this.margin * 2);
         this._renderer.setStyle(this.sdsAlert.nativeElement, 'height', width + 'px');
         resizedHeight = true;
      }

      if (alertClientRect.width >= referenceClientRect.width) {
         const width = referenceClientRect.width - (this.margin * 2);
         this._renderer.setStyle(this.sdsAlert.nativeElement, 'width', width + 'px');
         resizedWidth = true;
      }

      const topValue = this.getTopValue(verticalPosition, referenceClientRect, resizedHeight);
      const leftValue = this.getLeftValue(horizontalPosition, referenceClientRect, resizedWidth);
      this._renderer.setStyle(this.sdsAlert.nativeElement, 'top', topValue + 'px');
      this._renderer.setStyle(this.sdsAlert.nativeElement, 'left', leftValue + 'px');
   }

   private getTopValue(position: string, referenceClientRect: ClientRect, resized: boolean): number {
      const sdsAlert: HTMLElement = this.sdsAlert.nativeElement;
      const sdsAlertClientRect: ClientRect = sdsAlert.getBoundingClientRect() as ClientRect;
      const height: number = referenceClientRect.height > window.innerHeight ? window.innerHeight : referenceClientRect.height;
      let topValue = 0;

      if (position === 'top') {
         topValue = referenceClientRect.top + this.margin;
      } else if (position === 'bottom') {
         topValue = referenceClientRect.bottom - sdsAlertClientRect.height - this.margin;
      } else if (position === 'center') {
         topValue = referenceClientRect.top + (height / 2) - (sdsAlertClientRect.height / 2);

         if (!resized) {
            topValue += this.margin;
         }
      }

      return topValue;
   }

   private getLeftValue(position: string, referenceClientRect: ClientRect, resized: boolean): number {
      const sdsAlert: HTMLElement = this.sdsAlert.nativeElement;
      const sdsAlertClientRect: ClientRect = sdsAlert.getBoundingClientRect() as ClientRect;
      const windowWidth: number = window.innerWidth - (this.margin * 2);
      const width: number = referenceClientRect.width > window.innerWidth ? windowWidth : referenceClientRect.width;
      let leftValue = 0;

      if (position === 'left') {
         leftValue = referenceClientRect.left + this.margin;
      } else if (position === 'right') {
         leftValue = referenceClientRect.right - sdsAlertClientRect.width - this.margin;
      } else if (position === 'center') {
         leftValue = referenceClientRect.left + (width / 2) - (sdsAlertClientRect.width / 2);

         if (!resized) {
            leftValue += this.margin;
         }
      }

      return leftValue;
   }

   private processConfiguration(config: SdsAlertConfig = this.config): void {
      const defaultConfig = this._alerts.DEFAULT_CONFIG;

      this.message = config?.message ? config.message : defaultConfig.message;
      this.title = config?.title ? config.title : defaultConfig.title;
      this.alertType = config?.alertType ? config.alertType : defaultConfig.alertType;
      this.alertIcon = config?.alertIcon ? config.alertIcon : defaultConfig.alertIcon;
      this.closeIcon = !!config?.closeIcon;
      this.position = config?.position ? config.position : defaultConfig.position;
      this.positionReference = config?.positionReference ? config.positionReference : defaultConfig.positionReference;
      this.margin = config?.margin ? config.margin : defaultConfig.margin;

      this.actionLeft = config?.actionLeft ? config.actionLeft : () => {};
      this.actionLeftLabel = config?.actionLeftLabel ? config.actionLeftLabel : null;
      this.actionRight = config?.actionRight ? config.actionRight : () => {};
      this.actionRightLabel = config?.actionRightLabel ? config.actionRightLabel : null;

      this.alertTimeout = config?.timeout ? config.timeout : defaultConfig.timeout;
      this.multipleTimeout = config?.multipleTimeout ? config.multipleTimeout : 0;

      const auxMap = {
         [SdsAlertType.INFO]: config?.infoTimeout ? config.infoTimeout : this.alertTimeout,
         [SdsAlertType.SUCCESS]: config?.successTimeout ? config.successTimeout : this.alertTimeout,
         [SdsAlertType.WARNING]: config?.warningTimeout ? config.warningTimeout : this.alertTimeout,
         [SdsAlertType.CRITICAL]: config?.criticalTimeout ? config.criticalTimeout : 0,
         [SdsAlertType.CONNECTION_LOST]: 0
      };
      this.alertTimeout = auxMap[this.alertType];

      if (this.alertType === SdsAlertType.CONNECTION_LOST) {
         this.closeIcon = false;
      }

      this._cd.detectChanges();

      if (!this.isDisabled && this.sdsAlert) {
         this._renderer.removeStyle(this.sdsAlert.nativeElement, 'width');
         this.setAlertPosition();
      }
   }

   private getTimeoutToApply(isMultiple: boolean): number {
      const timeout: number = isMultiple ? this.multipleTimeout : this.alertTimeout;
      if (!timeout && this.alertType !== SdsAlertType.CONNECTION_LOST) {
         this.closeIcon = true;
      }

      return timeout;
   }
}
