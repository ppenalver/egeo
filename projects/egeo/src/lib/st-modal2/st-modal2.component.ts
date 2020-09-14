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
   Input, OnChanges,
   OnInit,
   Output,
   Renderer2, SimpleChanges,
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
            animate('400ms')
         ]),
         transition('* => hidden, * => void', [
            animate('400ms')
         ])
      ])
   ]
})
export class StModal2Component implements OnInit, OnChanges {
   @ViewChild('modalContainer', {static: false}) modalContainer: ElementRef;
   @ViewChild('modal', {static: false}) modal: ElementRef;

   @Input() hotRender: boolean;
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
   public modalType: StModal2Type;
   public modalTypes: typeof StModal2Type;
   public showCloseControl: boolean;
   public showHeaderIcon: boolean;
   public allowClickOutside: boolean;
   public isFullWindow: boolean;
   public actionButtonLabel: string;
   public cancelButtonLabel: string;
   public enabledAnimation: boolean;
   public animationTime: number;
   public modalTitle: string;
   public showDefaultHeader: boolean;

   private readonly ESCAPE_KEYCODE: number = 27;
   private readonly MINIMUM_WIDTH: number = 300;
   private readonly MINIMUM_HEIGHT: number = 200;


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
      this.modalTypes = StModal2Type;
      this.showModalHTML = false;
      this.hotRender = false;
      this.animationTime = 300;
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

   public ngOnChanges(changes: SimpleChanges): void {
      if (this.hotRender && changes.modalConfig && changes.modalConfig.currentValue) {
         this.processConfiguration();
      }
   }

   public animationDone(event: AnimationEvent): void {
      if (event.toState === 'hidden') {
         this.showModalHTML = false;
      }
   }

   public onClickOutside(event: MouseEvent): void {
      if (event.target === this.modalContainer.nativeElement && this.allowClickOutside) {
         this.clickOutside.emit();
      }
   }

   private processConfiguration(): void {
      this.modalType = this.modalConfig.modalType;
      this.actionButtonLabel = this.modalConfig.actionButtonLabel ? this.modalConfig.actionButtonLabel : 'Save';
      this.cancelButtonLabel = this.modalConfig.cancelButtonLabel ? this.modalConfig.cancelButtonLabel : 'Cancel';
      this.showCloseControl = !!this.modalConfig.closeControl;
      this.isFullWindow = !!this.modalConfig.fullWindow;
      this.allowClickOutside = !!this.modalConfig.clickOutside;
      this.enabledAnimation = !!this.modalConfig.enableAnimation;
      this.animationTime = this.modalConfig.animationTime ? this.modalConfig.animationTime : 300;
      this.modalTitle = this.modalConfig.title ? this.modalConfig.title : '';
      this.showDefaultHeader = !!this.modalConfig.showDefaultHeader;

      if (this.modalType === StModal2Type.WARNING || this.modalType === StModal2Type.ERROR) {
         this.showHeaderIcon = true;
      }

      if (!this.hotRender && this.modal) {
         if (this.isFullWindow) {
            this.renderer.setStyle(this.modal.nativeElement, 'width', '100%');
            this.renderer.setStyle(this.modal.nativeElement, 'height', '100%');
         } else {
            const modalWidth = this.modalConfig.width ?? this.MINIMUM_WIDTH;
            const modalHeight = this.modalConfig.height ?? this.MINIMUM_HEIGHT;

            let renderWidth = modalWidth > window.innerWidth ? window.innerWidth : this.modalConfig.width;
            renderWidth = renderWidth < this.MINIMUM_WIDTH ? this.MINIMUM_WIDTH : renderWidth;

            let renderHeight = modalHeight > window.innerHeight ? window.innerHeight : this.modalConfig.height;
            renderHeight = renderHeight < this.MINIMUM_HEIGHT ? this.MINIMUM_HEIGHT : renderHeight;

            this.renderer.setStyle(this.modal.nativeElement, 'width', renderWidth + 'px');
            this.renderer.setStyle(this.modal.nativeElement, 'height', renderHeight + 'px');
         }
      }

      this.cd.detectChanges();
   }
}
