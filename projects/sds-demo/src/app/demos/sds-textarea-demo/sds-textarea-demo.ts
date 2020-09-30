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
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
   selector: 'sds-textarea-demo',
   templateUrl: 'sds-textarea-demo.html',
   styleUrls: ['./sds-textarea-demo.scss']
})
export class SdsTextareaDemoComponent {
   public configDoc: any = {
      html: 'demo/sds-textarea-demo/sds-textarea-demo.html',
      ts: 'demo/sds-textarea-demo/sds-textarea-demo.ts',
      component: 'lib/sds-textarea/sds-textarea.component.ts'
   };
   public myForm: FormGroup;
   public size: number = 0;
   public label: boolean = true;
   public disabled: boolean = false;
   public required: boolean = false;
   public helperErrorText: boolean = true;

   constructor(private fb: FormBuilder) {
      let disabledField: FormControl = new  FormControl('', []);
      this.myForm = fb.group({
         textarea: disabledField
      });
   }

   public setValidations(): void {
      if (this.required) {
         this.myForm.get('textarea').setValidators([Validators.required]);
      } else {
         this.myForm.get('textarea').setErrors(null);
         this.myForm.get('textarea').setValidators([]);
      }

      this.myForm.get('textarea').markAsPristine();
      this.myForm.get('textarea').updateValueAndValidity();
   }

   public setDisabled(): void {
      if (this.disabled) {
         this.myForm.get('textarea').disable();
      } else {
         this.myForm.get('textarea')?.enable();
         this.myForm.get('textarea')?.markAsPristine();
         this.myForm.get('textarea')?.updateValueAndValidity();
      }
   }
}
