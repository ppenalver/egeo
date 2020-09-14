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
import {StModal2Config, StModal2Type} from '../../../../../egeo/src/lib/st-modal2/st-modal2.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'st-modal2-demo',
  templateUrl: './st-modal2-demo.component.html',
  styleUrls: ['./st-modal2-demo.component.scss'],
   animations: [
      trigger('fade', [
         state('void', style({opacity: 0})),
         state('*', style({opacity: 1})),
         transition(':enter', [animate(300)]),
         transition(':leave', [animate(300)])
      ])
   ]
})
export class StModal2DemoComponent implements OnDestroy {

   public modalConfig: StModal2Config;
   public configForm: FormGroup;
   public showWidthChanged: boolean = false;
   public showHeightChanged: boolean = false;

   public showCloseControlMessage: boolean = false;
   public showConfirmButtonMessage: boolean = false;
   public showCancelButtonMessage: boolean = false;
   public showModal: boolean = false;
   public configDoc: any = {
      html: 'demo/st-modal2-demo/st-modal2-demo.component.html',
      ts: 'demo/st-modal2-demo/st-modal2-demo.component.ts',
      component: 'lib/st-modal2/st-modal2.component.ts'
   };
   private componentDestroyed$: Subject<void>;


   constructor(private cd: ChangeDetectorRef, private fb: FormBuilder) {
      this.modalConfig = {
         modalType: StModal2Type.CUSTOM_CONTENT,
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
         modalType: this.fb.control(StModal2Type.CUSTOM_CONTENT),
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
            const modalConfig: StModal2Config = {
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
      this.showCloseControlMessage = true;

      setTimeout(() => {
         this.showCloseControlMessage = false;
         this.cd.detectChanges();
      }, 2000);
   }

   public onConfirmButton(): void {
      this.showConfirmButtonMessage = true;

      setTimeout(() => {
         this.showConfirmButtonMessage = false;
         this.cd.detectChanges();
      }, 2000);
   }

   public onCancelButton(): void {
      this.showCancelButtonMessage = true;

      setTimeout(() => {
         this.showCancelButtonMessage = false;
         this.cd.detectChanges();
      }, 2000);
   }

   public onShowDefaultHeaderChange(): void {
      if (this.configForm.get('showDefaultHeader').value) {
         this.configForm.get('closeControl').setValue(true);
      }
   }
}
