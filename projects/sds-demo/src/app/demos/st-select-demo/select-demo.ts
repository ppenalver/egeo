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
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { StDropDownMenuGroup, StDropDownMenuItem } from '@stratio/egeo';
import { CssProperty } from '@app/shared/css-property-table/css-property-table.model';


@Component({
   selector: 'select-demo',
   templateUrl: 'select-demo.html',
   styleUrls: ['./select-demo.scss']
})

export class SelectDemoComponent {
   @ViewChild('templateDrivenForm') public templateDrivenForm: NgForm;

   public configDoc: any = {
      html: 'demo/st-select-demo/select-demo.html',
      ts: 'demo/st-select-demo/select-demo.ts',
      component: 'lib/st-select/st-select.ts'
   };

   public cssProperties: CssProperty[] = [
      {
         name: '--egeo-st-select__arrow--content',
         description: 'Arrow icon content',
         default: '\e63f'
      },
      {
         name: '--egeo-st-select__arrow--line-height',
         description: 'Arrow icon line height',
         default: '1'
      }, {
         name: '--egeo-st-select__arrow--font-size',
         description: 'Arrow icon font size',
         default: '12px'
      },
      {
         name: '--egeo-st-select__arrow--color',
         description: 'Arrow icon color',
         default: '$space-70'
      },
      {
         name: '--egeo-st-select__arrow--margin',
         description: 'Arrow icon margin',
         default: '5px 10px 0 0'
      }
   ];

   public options: StDropDownMenuItem[] = [
      {label: 'Select an option', value: undefined},
      { label: 'Afghanistan', value: 'afghanistan' },
      { label: 'Albania', value: 'albania' },
      { label: 'Australia', value: 'australia'  },
      { label: 'Brazil', value: 'brazil' },
      { label: 'Chile', value: 'chile' },
      { label: 'Costa Rica', value:  'costa_rica' },
      { label: 'Cuba', value: 'cuba' },
      { label: 'Czechia', value: 'czechia' },
      { label: 'Eritrea', value: 'eritrea' },
      { label: 'Estonia', value: 'estonia'  },
      { label: 'Ethiopia', value: 'ethiopia' },
      { label: 'Fiji', value: 'fiji' },
      { label: 'Finland', value: 'finland' },
      { label: 'France', value: 'france' },
      { label: 'Georgia', value: 'georgia' },
      { label: 'Germany', value: 'germany' },
      { label: 'Ghana', value: 'ghana' },
      { label: 'Honduras', value: 'honduras' },
      { label: 'Iceland', value: 'iceland' },
      { label: 'Italy', value: 'italy' },
      { label: 'Jamaica', value: 'jamaica' }
   ];
   public groupedOptions: StDropDownMenuGroup[] =  [
      {
         title: 'Severity', items: [
            { label: 'Critical Error', value: 'critical' },
            { label: 'Warning', value: 'Warning' }
         ]
      },
      {
         title: 'Status', items: [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' }
         ]
      }
   ];

   public model: any = {
      option1: null,
      option2: null
   };
   public reactiveForm: FormGroup; // our model driven form
   public disabled: boolean = false;
   public formControl: FormControl = new FormControl('', [Validators.required]);

   constructor(private _fb: FormBuilder) {
      this.formControl.markAsDirty();
      this.model.option1 = 1;
      this.options[5].selected = true;
      this.reactiveForm = this._fb.group({
         option1: [this.model.option1, Validators.required],
         option2: [this.model.option1, Validators.required]
      });
   }

   changeDisabled(): void {
      const controlNames: string[] = ['option1', 'option2'];
      this.disabled = !this.disabled;
      if (this.disabled) {
         this.reactiveForm.get(controlNames[0]).disable();
         this.reactiveForm.get(controlNames[1]).disable();
         this.templateDrivenForm.controls[controlNames[0]].disable();
         this.templateDrivenForm.controls[controlNames[1]].disable();
      } else {
         this.reactiveForm.get(controlNames[0]).enable();
         this.reactiveForm.get(controlNames[1]).enable();
         this.templateDrivenForm.controls[controlNames[0]].enable();
         this.templateDrivenForm.controls[controlNames[1]].enable();
      }
   }
}
