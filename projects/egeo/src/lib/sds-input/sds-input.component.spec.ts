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
import { ChangeDetectionStrategy, Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SdsInputComponent } from './sds-input.component';
import { SdsInputError } from './sds-input.model';
import { SdsInputModule } from './sds-input.module';
import { StLabelModule } from '../st-label/st-label.module';
import { StDropdownMenuModule } from '../st-dropdown-menu/st-dropdown-menu.module';
import { StDropDownMenuItem } from '../st-dropdown-menu/st-dropdown-menu.interface';
import { StClickOutsideModule } from '../directives/st-click-outside/st-click-outside.module';


let component: SdsInputComponent;
let fixture: ComponentFixture<SdsInputComponent>;
let input: HTMLInputElement;

describe('SdsInputComponent', () => {
   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, StLabelModule, StDropdownMenuModule, StClickOutsideModule],
         declarations: [SdsInputComponent]
      })
         .overrideComponent(SdsInputComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
         })
         .compileComponents();  // compile template and css
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(SdsInputComponent);
      input = fixture.nativeElement.querySelector('input');
      component = fixture.componentInstance;
      component.qaTag = 'test qaTag';
      fixture.detectChanges();
   });

   it('Input should have a placeholder', () => {
      component.placeholder = 'Placeholder sample';
      fixture.detectChanges();
      expect(input.getAttribute('placeholder')).toContain('Placeholder sample');
   });

   it('Input can be a password Input', () => {
      component.fieldType = 'password';
      fixture.detectChanges();
      expect(input.getAttribute('type')).toContain('password');
   });

   it('Input can be a text Input', () => {
      component.fieldType = 'text';
      fixture.detectChanges();
      expect(input.getAttribute('type')).toContain('text');
   });

   it('Input can be a number Input', () => {
      component.fieldType = 'number';
      fixture.detectChanges();
      expect(input.getAttribute('type')).toContain('number');
   });

   it('Input should be disabled', () => {
      fixture.detectChanges();

      component.setDisabledState(true);
      fixture.detectChanges();
      expect(input.disabled).toBe(true);

      component.setDisabledState(false);
      fixture.detectChanges();
      expect(input.disabled).toBe(false);
   });

   it('Input should be enabled', () => {
      fixture.detectChanges();
      component.setDisabledState(false);
      fixture.detectChanges();
      expect(input.disabled).toBe(false);
   });

   it('Input should be focused naturally', () => {
      fixture.detectChanges();
      input.focus();
      expect(component.focus).toBe(true);
   });

   it('When user leaves input, it emits an event', () => {
      spyOn(component.blur, 'emit');

      input.dispatchEvent(new Event('focus'));
      fixture.detectChanges();
      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(component.blur.emit).toHaveBeenCalledTimes(1);
   });

   it('label is only generated if label input is not empty', () => {
      component.label = 'fake label';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label.sds-input__label')).not.toBeNull();

      component.label = '';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('label.sds-input__label')).toBeNull();
   });

   it('if default value is not introduced, reset button is not displayed', () => {
      expect(fixture.nativeElement.querySelector('.reset-button')).toBeNull();

      let htmlInput: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      htmlInput.dispatchEvent(new Event('focus'));
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.reset-button')).toBeNull();
   });

});

@Component({
   template: `
      <form [formGroup]="reactiveForm" novalidate autocomplete="off" (ngSubmit)="onSubmitReactiveForm()" class="col-md-6">
         <div class="form-group">
            <sds-input #input
                      label="Description"
                      placeholder="Module description"
                      [forceValidations]="forceValidations"
                      name="description"
                      qaTag="description-input"
                      formControlName="description"
                      [fieldType]=fieldType
            ></sds-input>
            <sds-input
               label="Components"
               name="components"
               id="components-input"
               formControlName="components"
               fieldType="number"
            ></sds-input>
         </div>
      </form>
   `
})
class FormReactiveComponent implements OnInit {
   public fieldType: string = 'string';
   public forceValidations: boolean;
   public reactiveForm: FormGroup;
   public minLength: number = 3;
   public maxLength: number = 20;
   public min: number = 10;
   public max: number = 100;
   public pattern: string = '[a-z]*';
   public model: any = {
      name: 'Egeo',
      description: '',
      components: 10
   };

   @ViewChild('input', { static: true }) input: SdsInputComponent;

   constructor(private _fb: FormBuilder) {
   }

   ngOnInit(): void {
      this.reactiveForm = this._fb.group({
         description: [
            this.model.description,
            [
               Validators.required,
               Validators.minLength(this.minLength),
               Validators.maxLength(this.maxLength),
               Validators.pattern(this.pattern)
            ]
         ],
         components: new FormControl()
      });
   }

   disableInput(): void {
      this.reactiveForm.get('description').disable();
   }

   enableInput(): void {
      this.reactiveForm.get('description').enable();
   }


   onSubmitReactiveForm(): void {
   }
}

let reactiveFixture: ComponentFixture<FormReactiveComponent>;
let reactiveComp: FormReactiveComponent;

// tslint:disable-next-line:ban
xdescribe('SdsInputComponent in reactive form', () => {
   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule, SdsInputModule],
         declarations: [FormReactiveComponent]
      })
         .overrideComponent(SdsInputComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
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
      let htmlInput: HTMLInputElement = reactiveFixture.debugElement.query(By.css('input')).nativeElement;

      expect(htmlInput.placeholder).toBe('Module description');
   });

   it('should be able to disable and enable', () => {
      reactiveComp.forceValidations = false;
      reactiveFixture.detectChanges();

      reactiveComp.enableInput();
      reactiveFixture.detectChanges();
      let htmlInput: HTMLInputElement = reactiveFixture.debugElement.query(By.css('input')).nativeElement;
      expect(htmlInput).toBeDefined();
      expect(htmlInput.classList).not.toContain('disabled');

      reactiveComp.disableInput();
      reactiveFixture.detectChanges();
      htmlInput = reactiveFixture.debugElement.query(By.css('input')).nativeElement;
      expect(htmlInput).toBeDefined();
      expect(htmlInput.disabled).toBeTruthy();

      reactiveComp.enableInput();
      reactiveFixture.detectChanges();
      htmlInput = reactiveFixture.debugElement.query(By.css('input')).nativeElement;
      expect(htmlInput).toBeDefined();
      expect(htmlInput.disabled).toBeFalsy();
   });

   it('if internal control is not defined, when event is listened and force validations is true it does not do anything', () => {
      spyOn(reactiveComp.input, 'writeValue');
      reactiveComp.input.internalControl = undefined;

      reactiveComp.input.forceValidations = true;
      reactiveComp.input.ngOnChanges({});

      expect(reactiveComp.input.writeValue).not.toHaveBeenCalled();

      reactiveComp.input.internalControl = new FormControl();
      reactiveComp.input.ngOnChanges({});

      expect(reactiveComp.input.writeValue).toHaveBeenCalled();
   });

   it('if it is a number input, model emitted has to be a number', () => {
      reactiveFixture.detectChanges();
      let htmlInput: HTMLInputElement = reactiveFixture.nativeElement.querySelector('#components-input input');

      htmlInput.value = '8.9';
      htmlInput.dispatchEvent(new Event('input'));
      reactiveFixture.detectChanges();

      expect((<any> reactiveComp.reactiveForm.controls).components.value).toBe(8.9);
   });
});


// TODO: TEST INPUT IN TEMPLATE FORM
