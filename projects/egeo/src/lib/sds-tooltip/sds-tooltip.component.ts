/*
 * © 2017 Stratio Big Data Inc., Sucursal en España. All rights reserved.
 *
 * This software – including all its source code – contains proprietary
 * information of Stratio Big Data Inc., Sucursal en España and
 * may not be revealed, sold, transferred, modified, distributed or
 * otherwise made available, licensed or sublicensed to third parties;
 * nor reverse engineered, disassembled or decompiled, without express
 * written authorization from Stratio Big Data Inc., Sucursal en España.
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { SdsTooltipPlacement } from './sds-tooltip.interface';

/**
 * @description {Component} SdsTooltip
 *
 * This component shows an informative pop up over an element
 *
 * @model
 *
 *   [SdsTooltipPlacement] {./sds-tooltip.interface.ts#SdsTooltipPlacement}
 *
 * @example
 *
 * {html}
 *
 * ```
 *     <span sds-tooltip id="tooltip-demo" title="This is the tooltip activated on click"
 *       [showOnClick]="showOnClick"
 *       [white]="whiteTheme"
 *       [showArrow]="showArrow"
 *       [placement]="placement"
 *       [margin]="margin"
 *       [title]="text"
 *       [animated]="animated">
 *          Text with tooltip <span class="icon-help2"></span>
 *    </span>
 *
 * ```
 */
@Component({
   selector: '[sds-tooltip]',
   styleUrls: ['./sds-tooltip.component.scss'],
   templateUrl: './sds-tooltip.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class SdsTooltipComponent implements OnInit {

   @HostBinding('class.sds-tooltip') classTooltip: boolean;
   @HostBinding('class.sds-tooltip--on') classTooltipOn: boolean;
   @HostBinding('class.sds-tooltip--off') classTooltipOff: boolean;

   /** @Input {boolean} [showArrow=false] when true, arrow icon is displayed    */
   @HostBinding('class.sds-tooltip--with-arrow')
   @Input() showArrow?: boolean;
   /** @Input {boolean} [white=false] when true, tooltip is displayed with white theme  */
   @HostBinding('class.sds-tooltip--white')
   @Input() white?: boolean;
   /** @Input {boolean} [animated=true] when true, tooltip is displayed with an animation  */
   @HostBinding('class.sds-tooltip--animated')
   @Input() animated: boolean;

   @HostBinding('class')
   public placementClass: string;

   private _title: string;
   private _placement: SdsTooltipPlacement = 'top';
   private _margin: string;
   private _showOnClick: boolean = false;

   constructor(private _el: ElementRef,
               private _cd: ChangeDetectorRef) {
      this.classTooltipOn = false;
      this.showArrow = false;
      this.white = false;
      this.animated = true;
   }

   /** @Input {string} [title='] Text displayed on tooltip  */
   @Input('attr.title')
   set title(value: string) {
      this._title = value;
      if (value) {
         this._el.nativeElement.setAttribute('title', value);
      } else {
         this._el.nativeElement.removeAttribute('title');
      }
      if (value?.length) {
         this.classTooltip = true;
      } else {
         this._resetTooltip();
      }
   }

   get title(): string {
      return this._title;
   }

   /** @Input {string} [margin='8px'] Distance between tooltip and text */
   @Input()
   get margin(): string {
      return this._margin;
   }

   set margin(value: string) {
      this._margin = value;
      if (value) {
         this._el.nativeElement.style.setProperty('--egeo-sds-tooltip--margin', value);
      }
   }

   /** @Input {boolean} [showOnClick=false] when true, tooltip is displayed when user clicks on text  */
   @Input()
   get showOnClick(): boolean {
      return this._showOnClick;
   }

   set showOnClick(value: boolean) {
      this._showOnClick = value;
      this.classTooltipOff = this._showOnClick;
   }

   @Input()
   set placement(value: SdsTooltipPlacement) {
      this._placement = value;
      this._updatePlacementClass();
   }

   get placement(): SdsTooltipPlacement {
      return this._placement;
   }

   ngOnInit(): void {
      this.title = this._el.nativeElement.title;
      if (this._title?.length) {
         this._updatePlacementClass();
      }
   }

   onClickOutside(): void {
      if (this.showOnClick) {
         this.classTooltipOn = false;
         this.classTooltipOff = true;
         this._cd.markForCheck();
      }
   }

   @HostListener('click') onClick(): void {
      if (this.showOnClick && this.title) {
         this.classTooltipOn = !this.classTooltipOn;
         this.classTooltipOff = !this.classTooltipOff;
         this._cd.markForCheck();
      }
   }

   private _updatePlacementClass(): void {
      this.placementClass = 'sds-tooltip--' + this._placement;
   }

   private _resetTooltip(): void {
      this.classTooltipOff = false;
      this.classTooltip = false;
      this.classTooltipOn = false;
      this.placementClass = '';
   }
}
