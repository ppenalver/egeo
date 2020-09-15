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
   Component,
   Input,
   EventEmitter,
   Output,
   OnInit,
   Optional, forwardRef, Directive, ContentChildren, QueryList
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { RadioChange } from './sds-radio.change';
import { SelectOneDispatcher } from '../utils/unique-dispatcher';

export const MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any = {
   provide: NG_VALUE_ACCESSOR,
   // tslint:disable-next-line:no-use-before-declare
   useExisting: forwardRef(() => SdsRadioGroupComponent),
   multi: true
};

let _uniqueIdCounter = 0;

// tslint:disable-next-line:max-classes-per-file
@Directive({
   selector: 'sds-radio-group',
   providers: [MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
   host: {
      role: 'radiogroup'
   }
})
export class SdsRadioGroupComponent implements ControlValueAccessor {

   @Output()
   change: EventEmitter<RadioChange> = new EventEmitter<RadioChange>();

   @Input()
   qaTag: string;

   @Input()
   get value(): any {
      return this._value;
   }

   set value(newValue: any) {
      if (this._value !== newValue) {
         this._value = newValue;
      }

      this.updatedSelectRadioFromValue();
      this.checkSelectRadio();
   }

   @Input()
   get name(): string {
      return this._name;
   }

   set name(value: string) {
      this._name = value;
      this.updateRadioName();
   }

   @Input()
   get selected(): SdsRadioComponent {
      return this._selected;
   }
   set selected(selected: SdsRadioComponent) {
      this._selected = selected;
      this.value = selected ? selected.value : null;
      this.checkSelectRadio();
   }

   @Input()
   get disabled(): boolean { return this._disabled; }
   set disabled(value: boolean) {
      this._disabled = (value != null && value !== false) ? true : null;
   }

   // tslint:disable-next-line:no-use-before-declare
   @ContentChildren(forwardRef(() => SdsRadioComponent), { descendants: true })
   _radios: QueryList<SdsRadioComponent> = null;

   _value: any = null;
   _selected: SdsRadioComponent = null;
   _disabled: boolean = false;
   _name: string = `sds-radio-group-${_uniqueIdCounter++}`;

   constructor(
   ) { }

   _controlValueAccessorChangeFn: (value: any) => void = (value) => { };

   onTouched: () => any = () => { };

   writeValue(value: any): void {
      this.value = value;
   }

   registerOnChange(fn: (value: any) => void): void {
      this._controlValueAccessorChangeFn = fn;
   }

   registerOnTouched(fn: any): void {
      this.onTouched = fn;
   }

   emitChangeEvent(): void {
      let event = new RadioChange();
      event.source = this._selected;
      event.value = this._value;
      this.change.emit(event);
   }

   checkSelectRadio(): void {
      if (this.selected && !this._selected.checked) {
         this._selected.checked = true;
      }
   }

   touch(): void {
      if (this.onTouched) {
         this.onTouched();
      }
   }

   setDisabledState(isDisabled: boolean): void {
      this.disabled = isDisabled;
   }

   private updateRadioName(): void {
      if (this._radios) {
         this._radios.forEach((radio) => {
            radio.name = this.name;
         });
      }
   }

   private updatedSelectRadioFromValue(): void {
      let isAlreadySelected = this._selected != null && this._selected.value === this._value;

      if (this._radios != null && !isAlreadySelected) {
         this._selected = null;
         this._radios.forEach((radio) => {
            radio.checked = this.value === radio.value;
            if (radio.checked) {
               this._selected = radio;
            }
         });
      }
   }
}


let idUnique: number = 0;

/**
 * @description {Component} [Radio]
 *
 * The radio component is used normally in a form acting as the standard html radio input but also user can use it out of a form like a template driven form.
 *
 * @example
 *
 * {html}
 *
 * ```
 * <sds-radio-group class ="radio-inline">
 *    <sds-radio value="1">Enabled</sds-radio>
 *    <sds-radio value="2" [disabled]="true">Disabled</sds-radio>
 *    <sds-radio value="2" [checked]= "true" [disabled]="true">Disabled checked</sds-radio>
 * </sds-radio-group>
 * ```
 *
 */
@Component({
   selector: 'sds-radio',
   templateUrl: './sds-radio.component.html',
   styleUrls: ['./sds-radio.component.scss'],
   host: {
      '[class.sth-radio-checked]': 'checked',
      '[attr.id]': 'id'
   }
})
export class SdsRadioComponent implements OnInit {

   radioGroup: SdsRadioGroupComponent;
   /** @Input {string} [id='sds-radio-<unique id>'] Input Id value */
   @Input() id: string = `sds-radio-${idUnique++}`;
   /** @Input {string} [qaTag='sds-radio-<unique id>'] Id value for qa test */
   @Input() qaTag: string = `sds-radio-${idUnique++}`;
   /** @Input {string} [name=''] Input name value */
   @Input() name: string;
   /** @Input {boolean} [showLabel=''] If true, shows control's label. Defaults to true */
   @Input() showLabel: boolean;
   /** @Input {boolean} [checked=''] Boolean to check the radio button */
   @Input()
   get checked(): boolean {
      return this._checked;
   }

   set checked(newCheckedState: boolean) {

      if (this._checked !== newCheckedState) {
         this._checked = newCheckedState;
      }

      if (newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
         this.radioGroup.selected = this;
      } else if (!newCheckedState && this.radioGroup && this.radioGroup.value === this.value) {
         this.radioGroup.selected = null;
      }

      if (newCheckedState) {
         this._radioDispatcher.notify(this.id, this.name);
      }
   }
   /** @Input {boolean} [disabled=''] Boolean to disable the radio button */
   @Input()
   get disabled(): boolean {
      return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
   }

   set disabled(value: boolean) {
      this._disabled = (value != null && value !== false) ? true : null;
   }
   /** @Input {boolean} [value=''] Value of the radio button */
   @Input()
   get value(): any {
      return this._value;
   }

   set value(value: any) {
      if (this._value !== value) {
         this._value = value;

         if (this.radioGroup != null) {
            if (!this.checked) {
               this.checked = this.radioGroup.value === value;
            } else {
               this.radioGroup.selected = null;
            }
         }
      }
   }

   /** @Output {boolean} [change=''] Boolean emitted when radio button is changed */
   @Output() change: EventEmitter<RadioChange> = new EventEmitter<RadioChange>();

   get inputId(): string {
      return `${this.id}-input`;
   }

   _value: any = null;
   _checked: boolean;
   _disabled: boolean;

   constructor(
      @Optional() radioGroup: SdsRadioGroupComponent,
      private _radioDispatcher: SelectOneDispatcher
   ) {
      this.showLabel = true;
      this.radioGroup = radioGroup;
      _radioDispatcher.listen((id: string, name: string) => {
         if (id !== this.id && name === this.name) {
            this.checked = false;
         }
      });
   }

   ngOnInit(): void {
      if (this.radioGroup && this.radioGroup.value) {
         this.checked = this.radioGroup.value === this._value;
      }

      if (this.radioGroup) {
         this.name = this.radioGroup.name;
      }
   }

   onInputBlur(): void {
      if (this.radioGroup) {
         this.radioGroup.touch();
      }
   }

   onInputClick(event: Event): void {
      event.stopPropagation();
   }

   toggleRadio(event: Event): void {
      event.stopPropagation();
      let groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;

      if (!this.disabled) {
         this.checked = !this.checked;
         this.emitChangeEvent();
      }

      if (this.radioGroup) {
         this.radioGroup._controlValueAccessorChangeFn(this.value);

         if (groupValueChanged) {
            this.radioGroup.emitChangeEvent();
         }
      }
   }

   private emitChangeEvent(): void {
      let event = new RadioChange();
      event.source = this;
      event.value = this._value;
      this.change.emit(event);
   }
}
