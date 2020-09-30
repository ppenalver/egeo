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

import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {SdsModalConfig, SdsModalType} from '../../../../../egeo/src/lib/sds-modal/sds-modal.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'sds-modal-demo',
  templateUrl: './sds-modal-demo.component.html',
  styleUrls: ['./sds-modal-demo.component.scss'],
   animations: [
      trigger('fade', [
         state('void', style({opacity: 0})),
         state('*', style({opacity: 1})),
         transition(':enter', [animate(300)]),
         transition(':leave', [animate(300)])
      ])
   ]
})
export class SdsModalDemoComponent implements OnDestroy {

   public modalConfig: SdsModalConfig;
   public configForm: FormGroup;
   public showWidthChanged: boolean = false;
   public showHeightChanged: boolean = false;

   public showMessage: boolean = false;
   public message: string = '';
   public messageTimeout: any;
   public showModal: boolean = false;
   public configDoc: any = {
      html: 'demo/sds-modal-demo/sds-modal-demo.component.html',
      ts: 'demo/sds-modal-demo/sds-modal-demo.component.ts',
      component: 'lib/sds-modal/sds-modal.component.ts'
   };
   private componentDestroyed$: Subject<void>;


   constructor(private cd: ChangeDetectorRef, private fb: FormBuilder) {
      this.modalConfig = {
         modalType: SdsModalType.CUSTOM_CONTENT,
         height: null,
         width: 600,
         closeControl: true,
         clickOutside: true,
         fullWindow: false,
         enableAnimation: true,
         showDefaultHeader: false,
         title: 'Modal title',
         actionButtonLabel: 'Accept',
         cancelButtonLabel: 'Cancel'
      };
      this.componentDestroyed$ = new Subject();

      this.configForm = this.fb.group({
         modalType: this.fb.control(SdsModalType.CUSTOM_CONTENT),
         height: this.fb.control(null),
         width: this.fb.control(600),
         closeControl: this.fb.control(true),
         clickOutside: this.fb.control(true),
         fullWindow: this.fb.control(false),
         enableAnimation: this.fb.control(true),
         showDefaultHeader: this.fb.control(false),
         modalTitle: this.fb.control('Modal title')
      });

      this.configForm.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe(() => {
            const modalConfig: SdsModalConfig = {
               modalType: this.configForm.get('modalType').value,
               closeControl: this.configForm.get('closeControl').value,
               clickOutside: this.configForm.get('clickOutside').value,
               fullWindow: this.configForm.get('fullWindow').value,
               enableAnimation: this.configForm.get('enableAnimation').value,
               showDefaultHeader: this.configForm.get('showDefaultHeader').value,
               title: this.configForm.get('modalTitle').value
            };

            this.modalConfig = Object.assign({}, this.modalConfig, modalConfig);
            this.cd.detectChanges();
         });

      this.configForm.get('fullWindow').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((value) => {
            this.modalConfig.actionButtonLabel = value ? 'Save' : 'Accept';
         });
   }

   public ngOnDestroy(): void {
      this.componentDestroyed$.next();
      this.componentDestroyed$.complete();
      this.componentDestroyed$.unsubscribe();
   }

   public triggerModal(): void {
      this.modalConfig = {
         ...this.modalConfig,
         modalType: this.configForm.get('modalType').value,
         closeControl: this.configForm.get('closeControl').value,
         height: this.configForm.get('height').value,
         clickOutside: this.configForm.get('clickOutside').value,
         showDefaultHeader: this.configForm.get('showDefaultHeader').value,
         fullWindow: this.configForm.get('fullWindow').value,
         enableAnimation: this.configForm.get('enableAnimation').value
      };

      this.showModal = true;
   }

   public onWidthKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
         if (this.configForm.get('width').value < 300) {
            this.configForm.get('width').setValue(300, {emitEvent: false});
         }

         this.showWidthChanged = true;
         this.modalConfig = Object.assign({}, this.modalConfig, {width: this.configForm.get('width').value});

         setTimeout(() => {
            this.showWidthChanged = false;
            this.cd.detectChanges();
         }, 2000);
      }
   }

   public onHeightKeyPress(event: KeyboardEvent): void {
      if (event.key === 'Enter') {
         if (this.configForm.get('height').value < 200) {
            this.configForm.get('height').setValue(200, {emitEvent: false});
         }

         this.showHeightChanged = true;
         this.modalConfig = Object.assign({}, this.modalConfig, {height: this.configForm.get('height').value});

         setTimeout(() => {
            this.showHeightChanged = false;
            this.cd.detectChanges();
         }, 2000);
      }
   }

   public onCloseControl(): void {
      this.message = 'Close control pressed...';
      this.showMessage = true;

      this.messageTimeout = setTimeout(() => {
         if (!this.messageTimeout) {
            this.showMessage = false;
            this.cd.detectChanges();
            this.messageTimeout = null;
         }
      }, 2000);
   }

   public onConfirmButton(): void {
      this.message = 'Confirm button pressed...';
      this.showMessage = true;

      this.messageTimeout = setTimeout(() => {
         if (!this.messageTimeout) {
            this.showMessage = false;
            this.cd.detectChanges();
            this.messageTimeout = null;
         }
      }, 2000);
   }

   public onCancelButton(): void {
      this.message = 'Cancel button pressed...';
      this.showMessage = true;

      this.messageTimeout = setTimeout(() => {
         if (!this.messageTimeout) {
            this.showMessage = false;
            this.cd.detectChanges();
            this.messageTimeout = null;
         }
      }, 2000);
   }

   public onShowDefaultHeaderChange(): void {
      if (this.configForm.get('showDefaultHeader').value) {
         this.configForm.get('closeControl').setValue(true);
      }
   }
}
