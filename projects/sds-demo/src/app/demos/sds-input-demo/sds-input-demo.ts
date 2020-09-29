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
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { StDropDownMenuItem, SdsInputError } from '@stratio/egeo';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
   selector: 'sds-input-demo',
   templateUrl: 'sds-input-demo.html',
   styleUrls: ['./sds-input-demo.component.scss'],
   animations: [
      trigger('fade', [
         state('void', style({opacity: 0})),
         state('*', style({opacity: 1})),
         transition(':enter', [animate(300)]),
         transition(':leave', [animate(300)])
      ])
   ]
})
export class SdsInputDemoComponent implements OnDestroy {
   public configDoc: Record<string, string> = {
      html: 'demo/sds-input-demo/sds-input-demo.html',
      ts: 'demo/sds-input-demo/sds-input-demo.ts',
      component: 'lib/sds-input/sds-input.component.ts'
   };

   public helperText: string = 'This is a required field.';
   public errorMessage: string;
   public inputDemo: FormControl = new FormControl('', [Validators.required]);
   public sizeControl: FormControl = new FormControl('regular');
   public iconLeftControl: FormControl = new FormControl('');
   public iconRightControl: FormControl = new FormControl('text');
   public iconActionControl: FormControl = new FormControl('');
   public labelControl: FormControl = new FormControl(true);
   public disabledControl: FormControl = new FormControl('');
   public helperErrorControl: FormControl = new FormControl(true);

   public iconLeftExamplesControl: FormControl = new FormControl('icon-cog');

   public sizeOptions: Record<string, string>[] = [
      {
         label: 'Regular',
         value: 'regular'
      },
      {
         label: 'Small',
         value: 'small'
      }
   ];

   public iconLeftOptions: Record<string, string>[] = [
      {
         label: 'Example 1',
         value: 'icon-cog'
      },
      {
         label: 'Example 2',
         value: 'icon-catalog'
      },
      {
         label: 'Example 3',
         value: 'icon-basket'
      },
      {
         label: 'Example 4',
         value: 'icon-pacman'
      }
   ];
   public iconRightOptions: Record<string, string>[] = [
      {
         label: 'None',
         value: 'text'
      },
      {
         label: 'Search',
         value: 'search'
      },
      {
         label: 'User',
         value: 'user'
      },
      {
         label: 'Email',
         value: 'email'
      },
      {
         label: 'Password',
         value: 'password'
      }
   ];
   private componentDestroyed$: Subject<void> = new Subject<void>();


   constructor(private cd: ChangeDetectorRef) {
      this.inputDemo.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe(() => {
            this.errorMessage = '';
            if (this.iconRightControl.value === 'text' && this.inputDemo.invalid && this.inputDemo.dirty) {
               this.errorMessage = 'Required field. Write something.';
            }
            if (this.iconRightControl.value === 'email' && this.inputDemo.invalid) {
               this.errorMessage = 'Introduce a valid email';
            }
            this.cd.detectChanges();
         });

      this.iconLeftControl.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            if (val) {
               this.iconLeftExamplesControl.setValue('icon-cog');
            }
         });

      this.iconRightControl.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            this.inputDemo.clearValidators();
            switch (val) {
               case 'text': {
                  this.inputDemo.setValidators([Validators.required]);
                  this.helperText = 'This is a required field.';
                  break;
               }
               case 'search': {
                  this.helperText = 'This is a helper text.';
                  break;
               }
               case 'user': {
                  this.helperText = 'This is a helper text.';
                  break;
               }
               case 'password': {
                  this.helperText = 'This is a helper text.';
                  break;
               }
               case 'email': {
                  this.inputDemo.setValidators([Validators.email]);
                  this.helperText = 'Try to write an email to check validation.';
                  break;
               }
               default: {
                  break;
               }
            }
            this.inputDemo.updateValueAndValidity();
         });
   }

   public ngOnDestroy(): void {
      this.componentDestroyed$.next();
      this.componentDestroyed$.complete();
      this.componentDestroyed$.unsubscribe();
   }

   public setDisabled(): void {
      if (this.disabledControl.value) {
         this.inputDemo.disable();
      } else {
         this.inputDemo.enable();
         this.inputDemo.markAsPristine();
         this.inputDemo.updateValueAndValidity();
      }
   }
}
