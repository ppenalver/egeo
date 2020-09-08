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
   AfterViewInit,
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   ElementRef,
   EventEmitter,
   forwardRef,
   HostBinding,
   Injector,
   Input,
   OnInit,
   Output,
   ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cloneDeep as _cloneDeep, flatten as _flatten, has as _has } from 'lodash';

import { StCheckValidationsDirective } from './st-check-validations';
import { ARROW_KEY_CODE, StDropDownMenuGroup, StDropDownMenuItem } from '../st-dropdown-menu/st-dropdown-menu.interface';

@Component({
   selector: 'st-select',
   templateUrl: './st-select.html',
   styleUrls: ['./st-select.scss'],
   host: {
      'class': 'st-select'
   },
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StSelectComponent), multi: true }
   ]
})
export class StSelectComponent implements AfterViewInit, OnInit, ControlValueAccessor {

   @Input() placeholder: string = '';
   @Input() name: string = '';
   @Input() label: string = '';
   @Input() tooltip: string | null = null;
   @Input() errorMessage: string;
   @Input() selected: StDropDownMenuItem = undefined;
   @Input() default: any;
   @Input() itemsBeforeScroll: number = 10;
   @Input() forceValidations: boolean = false;
   @Input() keyBoardMove: boolean = true;

   @Output() expand: EventEmitter<boolean> = new EventEmitter<boolean>();
   @Output() select: EventEmitter<any> = new EventEmitter<any>();
   @Output() scrollAtBottom: EventEmitter<any> = new EventEmitter<any>();

   @ViewChild('input', { static: false }) inputElement: ElementRef;
   @ViewChild('button', { static: false }) buttonElement: ElementRef;
   @ViewChild('hiddenTypedText', { static: false }) hiddenTypedText: ElementRef;

   @HostBinding('class.st-select-opened')

   public expandedMenu: boolean = false;
   public inputFormControl: FormControl = new FormControl();

   onChange: (_: any) => void;
   onTouched: () => void;

   private _inputHTMLElement: HTMLInputElement | undefined = undefined;
   private _isDisabled: boolean = false;
   private _options: StDropDownMenuItem[] | StDropDownMenuGroup[] = [];
   private _lastKeyTimestamp: number;
   private _flatOptions: StDropDownMenuItem[] = [];

   constructor(private _selectElement: ElementRef,
               private _injector: Injector,
               private _cd: ChangeDetectorRef) {
   }

   ngOnInit(): void {
      if (this.selected) {
         this.inputFormControl.setValue(this.selected.label);
      }
   }

   // TODO: MOVE THIS TO FORM-BASE
   notifyError(errorMessage: string): void {
      this.errorMessage = errorMessage;
   }

   /*
    ****** getters && setters ******
    */
   @Input()
   set disabled(value: boolean) {
      this._isDisabled = value;
      this._cd.markForCheck();
   }

   get disabled(): boolean {
      return this._isDisabled;
   }

   @Input()
   set options(options: StDropDownMenuItem[] | StDropDownMenuGroup[]) {
      this._options = _cloneDeep(options);
      const selectedItem: StDropDownMenuItem | undefined = this.findByProperty('selected', true);
      this.removeAllSelected();
      if (selectedItem) {
         this.selected = selectedItem;
      }
      this._updateFlatOptions();
   }

   get options(): StDropDownMenuItem[] | StDropDownMenuGroup[] {
      return this._options;
   }

   get selectedValue(): string {
      return this.selected && this.selected.label ? this.selected.label : '';
   }

   get disableValue(): string | null {
      return this._isDisabled === true ? '' : null;
   }

   get selectId(): string | null {
      const select: HTMLElement = this._selectElement.nativeElement;
      return select.getAttribute('id') !== null ? select.id : null;
   }

   get inputId(): string | null {
      return this.selectId !== null ? `${this.selectId}-input` : null;
   }

   get labelId(): string | null {
      return this.selectId !== null ? `${this.selectId}-label` : null;
   }

   get optionsId(): string | null {
      return this.selectId !== null ? `${this.selectId}-options` : null;
   }

   get inputName(): string | null {
      return this.name && this.name.length > 0 ? this.name : null;
   }

   get hasLabel(): boolean {
      return this.label !== undefined && this.label !== null && this.label.length > 0;
   }

   showError(): boolean {
      return this.errorMessage && this.errorMessage.length && (this.inputFormControl.touched || this.forceValidations) && !this._isDisabled;
   }

   /*
    ****** Control value accessor && validate methods ******
    */

   // Set the function to be called when the control receives a change event.
   registerOnChange(fn: (_: any) => void): void {
      this.onChange = fn;
   }

   // Set the function to be called when the control receives a touch event.
   registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
   }

   setDisabledState(disabled: boolean): void {
      this._isDisabled = disabled;
      this._cd.markForCheck();
   }

   // Write a new value to the element.
   writeValue(newValue: any): void {
      if (!this.selected || this.selected.value !== newValue) {
         this.selected = this.findByProperty('value', newValue);
         if (this.selected) {
            this.inputFormControl.setValue(this.selected.label);
         }
         this._cd.markForCheck();
      }
   }

   /*
    ****** Component methods ******
    */

   ngAfterViewInit(): void {
      this._inputHTMLElement = this.inputElement.nativeElement;
      const directive: StCheckValidationsDirective = this._injector.get(StCheckValidationsDirective, null);
      if (directive) {
         directive.registerOnChange(this.notifyError.bind(this));
      }
   }

   onButtonClick(): void {
      if (!this._isDisabled) {
         this.toggleButton();
      }
   }

   onButtonKeyPress(event: KeyboardEvent): void {
      if (this.keyBoardMove) {
         if ((event.code === 'Enter' || event.code === 'Space') || (event.code === 'Escape' && this.expandedMenu)) {
            event.preventDefault();
            this.toggleButton();
         } else {
            if (event.code === ARROW_KEY_CODE.ARROW_DOWN || event.code === ARROW_KEY_CODE.ARROW_UP) {
               const selectedPosition: number = this.getSelectedOptionPosition();
               let newSelectedPosition: number = event.code === ARROW_KEY_CODE.ARROW_DOWN ? selectedPosition + 1 : selectedPosition - 1;
               newSelectedPosition = newSelectedPosition < 0 ? this._flatOptions.length - 1 :
                  (newSelectedPosition >= this._flatOptions.length ? 0 : newSelectedPosition);
               this.onChangeOption(this._flatOptions[newSelectedPosition], false, true);
               this._cd.markForCheck();
            }
         }
      }
   }

   moveSelectedOption(event: KeyboardEvent): void {
      if (this.keyBoardMove && event.key !== ARROW_KEY_CODE.ARROW_DOWN && event.key !== ARROW_KEY_CODE.ARROW_UP) {
         event.preventDefault();
         const typedText: string = this.hiddenTypedText.nativeElement.innerText;
         if (typedText) {
            let foundOption: StDropDownMenuItem = this.searchFirstMatchedOption(typedText);
            if (!foundOption && typedText.length > 1 && typedText[typedText.length - 2] === typedText[typedText.length - 1]) {
               this.hiddenTypedText.nativeElement.innerText = typedText.substring(0, 1);
               this.moveSelectedOption(event);
            }
            if (foundOption) {
               this.onChangeOption(foundOption, false, false);
            }
            this._cd.markForCheck();
         }
      }
   }

   saveTypedText(event: KeyboardEvent): void {
      if (this.keyBoardMove) {
         if (!this._lastKeyTimestamp || event.timeStamp - this._lastKeyTimestamp < 1000) {
            this._lastKeyTimestamp = event.timeStamp;
         } else {
            this.hiddenTypedText.nativeElement.innerText = '';
            this._lastKeyTimestamp = undefined;
         }
      }
   }

   createResetButton(): boolean {
      return this.default !== undefined && ((!this.selected && this.inputFormControl.touched) || (this.selected && this.selected.value !== this.default));
   }

   resetToDefault(): void {
      this.writeValue(this.default);
      this.select.emit(this.default);
      if (this.onChange) {
         this.onChange(this.default);
      }
      this._cd.markForCheck();
   }

   onClickOutside(): void {
      this.expandedMenu = false;
      this.expand.emit(this.expandedMenu); // Notify expand change
   }

   onChangeOption(option: StDropDownMenuItem, close: boolean = true, cleanSearch: boolean = true): void {
      this.selected = option;
      const value: any = option && option.value !== undefined ? option.value : undefined;
      if (this.onChange) {
         this.onChange(value);
      }
      this.inputFormControl.markAsTouched();
      if (this.onTouched) {
         this.onTouched();
      }
      this.select.emit(value);

      if ((value || (option && option.hasOwnProperty('value') && !option.value)) && close) {
         this.onClickOutside();
      }
      if (cleanSearch) {
         this.hiddenTypedText.nativeElement.innerText = '';
         this._lastKeyTimestamp = undefined;
      }
      this.hiddenTypedText.nativeElement.focus();
      this._cd.markForCheck();
   }

   onScrollAtBottom(): void {
      this.scrollAtBottom.emit();
   }

   /*
    ****** Util component methods ******
    */

   private _updateFlatOptions(): void {
      this._flatOptions = [];
      if (this._options) {
         this._options.forEach(_option => {
            if (_option.items) {
               this._flatOptions = this._flatOptions.concat(_option.items);
            } else {
               this._flatOptions.push(_option);
            }
         });
      }
   }

   // Search element by property in option list
   private findByProperty(propName: 'value' | 'selected', propValue: any): StDropDownMenuItem | undefined {
      if (this.isStDropdownItemList(this.options)) {
         return this.options.find(item => _has(item, propName) && item[propName] === propValue);
      } else if (this.isStDropdownGroupList(this.options)) {
         return _flatten(this.options.map(group => group.items)).find(item => _has(item, propName) && item[propName] === propValue);
      }
   }

   // Check if options are a instance of StDropDownMenuItem[]
   private isStDropdownItemList(items: StDropDownMenuItem[] | StDropDownMenuGroup[]): items is StDropDownMenuItem[] {
      return this.options && this.options.length > 0 && !_has((items as StDropDownMenuGroup[])[0], 'items');
   }

   // Check if options are a instance of StDropDownMenuGroup[]
   private isStDropdownGroupList(items: StDropDownMenuItem[] | StDropDownMenuGroup[]): items is StDropDownMenuGroup[] {
      return this.options && this.options.length > 0 && _has((items as StDropDownMenuGroup[])[0], 'items');
   }

   private toggleButton(): void {
      this.expandedMenu = !this.expandedMenu;
      this.expand.emit(this.expandedMenu); // Notify expand change
      this.hiddenTypedText.nativeElement.focus();
      this.hiddenTypedText.nativeElement.innerText = '';
      this._lastKeyTimestamp = undefined;
      this._cd.markForCheck();
   }

   // TODO: Remove when remove from StDropDownMenuItem model the selected property
   private removeAllSelected(): void {
      if (this.isStDropdownItemList(this.options)) {
         return this._options.forEach(item => {
            if (item.selected) {
               delete item.selected;
            }
         });
      } else if (this.isStDropdownGroupList(this.options)) {
         this._options.forEach(group => group.items.forEach(item => {
            if (item.selected) {
               delete item.selected;
            }
         }));
      }
   }

   private getSelectedOptionPosition(): number {
      return this._flatOptions && this.selected ? this._flatOptions.findIndex(_option => _option.value === this.selected.value) : -1;
   }

   private searchFirstMatchedOption(searchText: string): StDropDownMenuItem {
      const selectedPosition: number = this.getSelectedOptionPosition();
      const sortedOptions: StDropDownMenuItem[] = [
         ...this._flatOptions.slice(selectedPosition + 1, this._flatOptions.length),
         ...this._flatOptions.slice(0, selectedPosition)
      ];

      return sortedOptions.find(_option => _option.label.substring(0, searchText.length).toLowerCase() === searchText.toLowerCase());
   }
}
