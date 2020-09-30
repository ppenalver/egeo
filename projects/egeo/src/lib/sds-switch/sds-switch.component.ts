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
   EventEmitter,
   forwardRef,
   Input,
   Output
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {StEgeo} from '../decorators/require-decorators';
import {SdsSwitchPosition} from './sds-switch.model';

@Component({
   selector: 'sds-switch',
   host: {class: 'sds-switch'},
   templateUrl: './sds-switch.html',
   styleUrls: ['./sds-switch.component.scss'],
   providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SdsSwitchComponent), multi: true },
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => SdsSwitchComponent), multi: true }
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})

@StEgeo()
export class SdsSwitchComponent implements ControlValueAccessor {
   @Input() qaTag: string;
   @Input() label: string;
   @Input() name: string;
   @Input() contextualHelp: string;
   @Input() showLabel: boolean;
   @Input() position: SdsSwitchPosition;
   @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

   public sdsSwitchPosition: typeof SdsSwitchPosition;

   private _value: boolean;
   private _disabled: boolean;
   private registeredOnChange: (_: any) => void;

   constructor(private _cd: ChangeDetectorRef) {
      this.showLabel = true;
      this.sdsSwitchPosition = SdsSwitchPosition;
      this.position = SdsSwitchPosition.LEFT;
   }

   @Input()
   get value(): boolean {
      return this._value;
   }

   set value(value: boolean) {
      this._value = value;
      this._cd.markForCheck();
   }

   @Input()
   get disabled(): boolean {
      return this._disabled;
   }

   set disabled(disabled: boolean) {
      this._disabled = disabled;
      this._cd.markForCheck();
   }

   get labelQaTag(): string {
      return (this.qaTag || this.name) + '-label';
   }

   get relatedInput(): string {
      return `${this.name}-input`;
   }

   validate(control: FormControl): any {}

   // load external change
   writeValue(value: boolean): void {
      if (!this._disabled) {
         this._value = value;
         this.change.emit(this._value);
         if (this.registeredOnChange) {
            this.registeredOnChange(value);
         }
      }
   }


   // internal change callback
   registerOnChange(fn: (_: any) => void): void {
      this.registeredOnChange = fn;
   }

   registerOnTouched(fn: () => void): void {
   }

   setDisabledState(disable: boolean): void {
      this.disabled = disable;
   }

   onChange(event: MouseEvent): void {
      event.stopPropagation();
      let value: boolean = (<HTMLInputElement>event.target).checked;
      this._value = value;
      this.writeValue(value);
   }
}
