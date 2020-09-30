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
import { Component, DebugElement, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SdsTextareaComponent } from './sds-textarea.component';
import { SdsTextareaError } from './sds-textarea.error.model';
import { SdsTextareaModule } from './sds-textarea.module';
import { StLabelModule } from '../st-label/st-label.module';

let component: SdsTextareaComponent;
let fixture: ComponentFixture<SdsTextareaComponent>;
let textarea: HTMLInputElement;

describe('SdsTextareaComponent', () => {
   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, StLabelModule],
         declarations: [SdsTextareaComponent]
      })
         .compileComponents();  // compile template and css
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(SdsTextareaComponent);
      textarea = fixture.nativeElement.querySelector('textarea');
      component = fixture.componentInstance;
      component.qaTag = 'test qaTag';
   });

   it('Textarea should have a placeholder', () => {
      component.placeholder = 'Placeholder sample';
      fixture.detectChanges();
      expect(textarea.getAttribute('placeholder')).toContain('Placeholder sample');
   });

   it('Textarea should be disabled', () => {
      fixture.detectChanges();

      component.setDisabledState(true);
      fixture.detectChanges();
      expect(textarea.disabled).toBe(true);

      component.setDisabledState(false);
      fixture.detectChanges();
      expect(textarea.disabled).toBe(false);
   });

   it('Textarea should be enabled', () => {
      fixture.detectChanges();
      component.setDisabledState(false);
      expect(textarea.disabled).toBe(false);
   });

   it('Textarea should be focused naturally', () => {
      fixture.detectChanges();
      textarea.focus();
      expect(component.focus).toBe(true);
   });

   // TODO: Review this test because something is wrong
   it('Textarea should be focused as default', async(() => {
      fixture.detectChanges();
      component.isFocused = true;
      fixture.whenStable().then(() => {
         component.ngAfterViewInit();
         expect(component.focus).toBe(true);
      });
   }));

   it('When user leaves textarea, it emits an event', () => {
      spyOn(component.blur, 'emit');

      textarea.dispatchEvent(new Event('focus'));
      fixture.detectChanges();
      textarea.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(component.blur.emit).toHaveBeenCalledTimes(1);
   });


   describe('When a default value is introduced, user will be able to reset the textarea', () => {
      let fakeDefault: string = 'default value';

      beforeEach(() => {
         component.default = fakeDefault;
      });

      it('reset icon is only created if default input is introduced and current input value is different to it', () => {
         let htmlInput: HTMLInputElement = fixture.debugElement.query(By.css('textarea')).nativeElement;
         htmlInput.dispatchEvent(new Event('focus'));
         fixture.detectChanges();

         expect(fixture.nativeElement.querySelector('.st-form-control-reset-button')).toBeNull();

         htmlInput.value = 'test';
         htmlInput.dispatchEvent(new Event('input'));
         fixture.detectChanges();

         expect(fixture.nativeElement.querySelector('.st-form-control-reset-button')).not.toBeNull();
      });

      it('reset icon is only displayed when input is focused and user has typed something and it is different to default', () => {
         let htmlInput: HTMLInputElement = fixture.debugElement.query(By.css('textarea')).nativeElement;

         htmlInput.dispatchEvent(new Event('focus'));
         fixture.detectChanges();

         expect(fixture.nativeElement.querySelector('.st-form-control-reset-button')).toBeNull();

         htmlInput.value = 'test';
         htmlInput.dispatchEvent(new Event('input'));
         fixture.detectChanges();

         expect(fixture.debugElement.query(By.css('.st-form-control-reset-button')).styles.opacity).toEqual('1');

         htmlInput.dispatchEvent(new Event('blur'));
         fixture.detectChanges();

         expect(fixture.debugElement.query(By.css('.st-form-control-reset-button')).styles.opacity).toEqual('0');

         htmlInput.dispatchEvent(new Event('focus'));
         fixture.detectChanges();

         expect(fixture.debugElement.query(By.css('.st-form-control-reset-button')).styles.opacity).toEqual('1');

         htmlInput.value = fakeDefault;
         htmlInput.dispatchEvent(new Event('input'));
         fixture.detectChanges();

         expect(fixture.nativeElement.querySelector('.st-form-control-reset-button')).toBeNull();
      });


      it('when user clicks on the reset button, value of input will turn to the default value', () => {
         let htmlInput: HTMLInputElement = fixture.debugElement.query(By.css('textarea')).nativeElement;
         htmlInput.dispatchEvent(new Event('focus'));
         fixture.detectChanges();

         htmlInput.value = 'a';
         htmlInput.dispatchEvent(new Event('input'));
         fixture.detectChanges();

         fixture.nativeElement.querySelector('.st-form-control-reset-button').click();
         fixture.detectChanges();

         expect(htmlInput.value).toBe(fakeDefault);
      });

   });

});

@Component({
   template: `
      <form [formGroup]="reactiveForm" novalidate autocomplete="off" (ngSubmit)="onSubmitReactiveForm()" class="col-md-6">
         <div class="form-group">
            <sds-textarea
               label="Description"
               placeholder="Module description"
               [forceValidations]="forceValidations"
               [errorMessage]="errors.generic"
               name="description"
               qaTag="description-input"
               formControlName="description"
               rows="5"
               cols="50"
               wrap="soft">
            </sds-textarea>
         </div>
      </form>
      `
})
class FormReactiveComponent implements OnInit {
   public forceValidations: boolean;
   public reactiveForm: FormGroup;
   public model: any = {
      name: 'Egeo',
      description: '',
      components: 10
   };

   public errorMessage: string = '';

   public errors: SdsTextareaError = {
      generic: 'Error',
      required: 'This field is required'
   };

   constructor(private _fb: FormBuilder) { }

   ngOnInit(): void {
      this.reactiveForm = this._fb.group({
         description: [
            this.model.description,
            [
               Validators.required
            ]
         ]
      });
   }

   disableInput(): void {
      this.reactiveForm.get('description').disable();
   }

   enableInput(): void {
      this.reactiveForm.get('description').enable();
   }

   onSubmitReactiveForm(): void { }
}

let reactiveFixture: ComponentFixture<FormReactiveComponent>;
let reactiveComp: FormReactiveComponent;

describe('SdsTextareaComponent in reactive form', () => {
   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, SdsTextareaModule],
         declarations: [FormReactiveComponent]
      })
         .compileComponents();  // compile template and css
   });

   beforeEach(() => {
      reactiveFixture = TestBed.createComponent(FormReactiveComponent);
      reactiveComp = reactiveFixture.componentInstance;
   });

   afterEach(() => {
      reactiveFixture.destroy();
   });

   it('should be init correct', () => {
      reactiveFixture.detectChanges();
      let htmlInput: HTMLInputElement = reactiveFixture.debugElement.query(By.css('textarea')).nativeElement;

      expect(htmlInput.placeholder).toBe('Module description');
   });

   it('should be able to disable and enable', () => {
      reactiveComp.forceValidations = false;
      reactiveFixture.detectChanges();

      reactiveComp.enableInput();
      reactiveFixture.detectChanges();
      let htmlInput: HTMLInputElement = reactiveFixture.debugElement.query(By.css('textarea')).nativeElement;
      expect(htmlInput).toBeDefined();
      expect(htmlInput.classList).not.toContain('disabled');

      reactiveComp.disableInput();
      reactiveFixture.detectChanges();
      htmlInput = reactiveFixture.debugElement.query(By.css('textarea')).nativeElement;
      expect(htmlInput).toBeDefined();
      expect(htmlInput.classList).toContain('disabled');

      reactiveComp.enableInput();
      reactiveFixture.detectChanges();
      htmlInput = reactiveFixture.debugElement.query(By.css('textarea')).nativeElement;
      expect(htmlInput).toBeDefined();
      expect(htmlInput.classList).not.toContain('disabled');
   });
});

// TODO: TEST INPUT IN TEMPLATE FORM
