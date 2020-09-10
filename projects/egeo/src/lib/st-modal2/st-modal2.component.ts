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
   OnDestroy,
   OnInit,
   Output,
   Renderer2,
   ViewChild
} from '@angular/core';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs';
import {StWindowRefService} from '../utils/window-service';
import {StModal2Config, StModal2Type} from './st-modal2.model';

@Component({
   selector: ' st-modal2',
   templateUrl: './st-modal2.component.html',
   styleUrls: ['./st-modal2.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   animations: [
      trigger('state', [
         state('void, hidden', style({ opacity: 0 })),
         state('visible', style({ opacity: 1 })),
         transition('* => visible', [
            animate('{{animationTime}}')
         ]),
         transition('* => hidden, * => void', [
            animate('{{animationTime}}')
         ])
      ])
   ]
})
export class StModal2Component implements OnInit, OnDestroy {
   @ViewChild('modalContainer', {static: false}) modalContainer: ElementRef;
   @ViewChild('modal', {static: false}) modal: ElementRef;

   @Input() modalConfig: StModal2Config;
   @Input()
   get showModal(): boolean {
      return this.showModalHTML;
   }

   set showModal(showModal: boolean) {
      if (showModal) {
         this.showModalHTML = true;
         if (this.modalConfig) {
            this.visibility = 'visible';
            this.cd.detectChanges();
            this.processConfiguration();
         }
      } else {
         this.visibility = 'hidden';
      }
   }

   @Output() closeEscape: EventEmitter<void>;
   @Output() closeControl: EventEmitter<void>;
   @Output() clickOutside: EventEmitter<void>;
   @Output() cancelButton: EventEmitter<void>;
   @Output() confirmButton: EventEmitter<void>;

   public showModalHTML: boolean;
   public visibility: string;
   public _modalType: StModal2Type;
   public _modalTypes: typeof StModal2Type;
   public _showCloseControl: boolean;
   public _showHeaderIcon: boolean;
   public _allowClickOutside: boolean;
   public _isFullWindow: boolean;
   public _actionButtonLabel: string;
   public _cancelButtonLabel: string;
   public _enabledAnimation: boolean;
   public _animationTime: number;
   public _modalTitle: string;
   public _showStandardHeader: boolean;
   public _showStandardActions: boolean;

   private _subscriptions: Array<Subscription> = [];
   private ESCAPE_KEYCODE: number = 27;

   @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent): void {
      if (event.keyCode === this.ESCAPE_KEYCODE) {
         this.closeEscape.emit();
      }
   }

   constructor(
      private renderer: Renderer2,
      private cd: ChangeDetectorRef,
      private _window: StWindowRefService,
      private _el: ElementRef
   ) {
      this.visibility = 'visible';
      this._modalTypes = StModal2Type;
      this.showModalHTML = false;
      this._animationTime = 300;
      this.closeEscape = new EventEmitter();
      this.closeControl = new EventEmitter();
      this.clickOutside = new EventEmitter();
      this.cancelButton = new EventEmitter();
      this.confirmButton = new EventEmitter();
   }

   public ngOnInit(): void {
      if (this.modalConfig) {
         this.processConfiguration();
      }
   }

   public ngOnDestroy(): void {
      if (this._subscriptions.length > 0) {
         this._subscriptions.forEach((subscription) => {
            if (subscription) {
               subscription.unsubscribe();
            }
         });
      }
   }

   public animationDone(event: AnimationEvent): void {
      if (event.toState === 'hidden') {
         this.showModalHTML = false;
      }
   }

   public onClickOutside(event: MouseEvent): void {
      if (event.target === this.modalContainer.nativeElement && this._allowClickOutside) {
         this.clickOutside.emit();
      }
   }

   private processConfiguration(): void {
      this._modalType = this.modalConfig.modalType;
      this._actionButtonLabel = this.modalConfig.actionButtonLabel ? this.modalConfig.actionButtonLabel : 'Save';
      this._cancelButtonLabel = this.modalConfig.cancelButtonLabel ? this.modalConfig.actionButtonLabel : 'Cancel';
      this._showCloseControl = !!this.modalConfig.closeControl;
      this._isFullWindow = !!this.modalConfig.fullWindow;
      this._allowClickOutside = !!this.modalConfig.clickOutside;
      this._enabledAnimation = !!this.modalConfig.enableAnimation;
      this._animationTime = this.modalConfig.animationTime ? this.modalConfig.animationTime : 300;
      this._modalTitle = this.modalConfig.title ? this.modalConfig.title : '';
      this._showStandardHeader = !!this.modalConfig.showStandardHeader;
      this._showStandardActions = !!this.modalConfig.showStandardActions;

      if (this._modalType === StModal2Type.WARNING || this._modalType === StModal2Type.ERROR) {
         this._showHeaderIcon = true;
      }

      if (this._isFullWindow) {
         this.renderer.setStyle(this.modal.nativeElement, 'width', '100%');
         this.renderer.setStyle(this.modal.nativeElement, 'height', '100%');
      } else {
         if (this.modalConfig.width) {
            const renderWidth = this.modalConfig.width > window.innerWidth ? window.innerWidth : this.modalConfig.width;
            this.renderer.setStyle(this.modal.nativeElement, 'width', renderWidth + 'px');
         }

         if (this.modalConfig.height) {
            const renderHeight = this.modalConfig.height > window.innerHeight ? window.innerHeight : this.modalConfig.height;
            this.renderer.setStyle(this.modal.nativeElement, 'height', renderHeight + 'px');
         }
      }

      this.cd.detectChanges();
   }
}
