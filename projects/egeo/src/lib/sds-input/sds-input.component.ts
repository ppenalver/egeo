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
   forwardRef,
   Input,
   OnChanges,
   OnDestroy,
   OnInit,
   Output,
   ViewChildren
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';
import {SdsInputSize, SdsInputType} from './sds-input.model';
import {SdsInputIconActions} from '../sds-modal/sds-modal.model';

/**
 * @description {Component} [Input]
 *
 * The input component is for use normally inside a form, you can use too outside a form like a template driven form.
 *
 * @example
 *
 * {html}
 *
 * ```
 * <sds-input
 *    label="Components"
 *    placeholder="Number of components"
 *    [forceValidations]="forceValidations"
 *    [errors]="errorsInput"
 *    name="components-template"
 *    qaTag="components-input-template"
 *    required
 *    [(ngModel)]="model.components"
 *    contextualHelp="This is the contextual help of the components"
 *    [cols]="50" [rows]="10">
 * </sds-input>
 * ```
 *
 */
@Component({
   selector: 'sds-input',
   templateUrl: './sds-input.component.html',
   styleUrls: ['./sds-input.component.scss'],
   providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SdsInputComponent), multi: true },
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => SdsInputComponent), multi: true }
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class SdsInputComponent implements ControlValueAccessor, OnChanges, OnInit, OnDestroy  {
   /** @Input {string} [placeholder=''] The text that appears as placeholder of the input. It is empty by default */
   @Input() placeholder: string = '';

   /** @Input {string} [name=''] Name of the input */
   @Input() name: string = '';

   /** @Input {string} [label=''] Label to show over the input. It is empty by default */
   @Input() label: string = '';

   /** @Input {string} [errorMessage=''] Error message to show */
   @Input() errorMessage: string;

   /** @Input {string} [qaTag=''] Id for QA test */
   @Input() qaTag: string;

   /** @Input {boolean} [forceValidations=false] If you specify it to 'true', the input checks the errors before being modified by user */
   @Input() forceValidations: boolean = false;

   /** @Input {string} [contextualHelp=''] It will be displayed when user clicks on the info button */
   @Input() contextualHelp: string;

   /** @Input {string} [maxLength=''] Define a max-length for input field */
   @Input() maxLength: number;

   /** @Input {boolean} [isFocused=false] If true, the input will be focused on view init. */
   @Input() isFocused: boolean = false;

   /** @Input {number} [cols=''] Define input number of cols */
   @Input() cols: number;

   /** @Input {number} [rows=''] Define input number of rows */
   @Input() rows: number;

   /** @Input {string} [wrap='soft'] Define type of wrap as html standard */
   @Input() wrap: string = 'soft';

   @Input() size: SdsInputSize;
   @Input() fieldType: string;
   @Input() step: number;
   @Input() min: number;
   @Input() max: number;
   @Input() readonly: boolean;
   @Input() iconLeft: string;
   @Input() iconRight: string;
   @Input() iconRightAction: 'clear-input' | string;

   /** @Output {} [blur] Notify when user leaves a field */
   @Output() blur: EventEmitter<void> = new EventEmitter<void>();
   @Output() iconRightClick: EventEmitter<void> = new EventEmitter<void>();

   @ViewChildren('input') vc: ElementRef;

   public isDisabled: boolean = false; // To check disable
   public focus: boolean = false;
   public internalControl: FormControl;
   public showErrorValue: boolean = false;
   public sdsInputSize: typeof SdsInputSize;
   public sdsInputType: typeof SdsInputType;

   private sub: Subscription;
   private valueChangeSub: Subscription;
   private internalInputModel: any = '';

   constructor(private _cd: ChangeDetectorRef) {
      this.sdsInputSize = SdsInputSize;
      this.sdsInputType = SdsInputType;
   }

   onChange = (_: any) => { };
   onTouched = () => { };

   validate(control: FormControl): any {
      if (this.sub) {
         this.sub.unsubscribe();
      }
      this.sub = control.statusChanges.subscribe(() => this.checkErrors(control));
   }

   ngOnChanges(change: any): void {
      if (this.forceValidations) {
         this.writeValue(this.internalControl.value);
      }
      this._cd.markForCheck();
   }

   ngOnInit(): void {
      this.internalControl = new FormControl(this.internalInputModel);
      this.valueChangeSub = this.internalControl.valueChanges.subscribe((value) => this.onChange(value));
      this.showErrorValue = this.showError();
   }

   ngAfterViewInit(): void {
      if (this.isFocused) {
         this.focus = true;
         this.vc.nativeElement.focus();
      }
   }

   ngOnDestroy(): void {
      if (this.valueChangeSub) {
         this.valueChangeSub.unsubscribe();
      }
      if (this.sub) {
         this.sub.unsubscribe();
      }
   }

   // When value is received from outside
   writeValue(value: any): void {
      this.internalControl.setValue(value);
      this.internalInputModel = value;
   }

   // Registry the change function to propagate internal model changes
   registerOnChange(fn: (_: any) => void): void {
      this.onChange = fn;
   }

   // Registry the touch function to propagate internal touch events TODO: make this function.
   registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
   }

   setDisabledState(disable: boolean): void {
      this.isDisabled = disable;
      if (this.isDisabled && this.internalControl && this.internalControl.enabled) {
         this.internalControl.disable();
      } else if (!this.isDisabled && this.internalControl && this.internalControl.disabled) {
         this.internalControl.enable();
         this.internalControl.markAsPristine();
         this.showErrorValue = this.showError();
      }
      this._cd.markForCheck();
   }

   onIconRightClick(): void {
      if (this.iconRightAction === SdsInputIconActions.CLEAR_INPUT) {
         this.internalControl.setValue('');
      }
      this.iconRightClick.emit();
   }

   showError(): boolean {
      return !!this.errorMessage && (this.forceValidations || !this.internalControl.pristine);
   }

   /** Style functions */
   onFocus(event: Event): void {
      this.focus = true;
   }

   onFocusOut(event: Event, emitEvent: boolean): void {
      this.focus = false;

      if (emitEvent) {
         this.blur.emit();
      }
   }

   // When status change call this function to check if have errors
   private checkErrors(control: FormControl): void {
      if (control.pristine) {
         this.internalControl.markAsPristine();
      }


      this.showErrorValue = this.showError() && control.invalid;
      this._cd.markForCheck();
   }
}
