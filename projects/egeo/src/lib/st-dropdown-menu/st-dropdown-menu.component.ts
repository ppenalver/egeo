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
   HostListener,
   Input,
   OnChanges,
   OnDestroy,
   OnInit,
   Output,
   Renderer2,
   SimpleChanges,
   ViewChild
} from '@angular/core';

import { StPopOffset, StPopPlacement } from '../st-pop/st-pop.model';
import { ARROW_KEY_CODE, ENTER_KEY_CODE, SPACE_KEY_CODE, StDropDownMenuGroup, StDropDownMenuItem, StDropDownVisualMode } from './st-dropdown-menu.interface';
import { StDropdownMenuUtils } from './utils/st-dropdown-menu.utils';

/**
 * @description {Component} [Dropdown Menu]
 * This directive show a dropdown menu list in element that you attach
 *
 *
 * @model
 *
 *   [Menu items] {./st-dropdown-menu.interface.ts#StDropDownMenuItem}
 *
 * @example
 *
 * {html}
 *
 * ```
 * <st-dropdown-menu [items]="list" [active]="show" (change)="onChange(event)">
 *    <button class="button button-primary" (click)="show = !show">Show menu</button>
 * </st-dropdown-menu>
 * ```
 */
@Component({
   selector: 'st-dropdown-menu',
   templateUrl: './st-dropdown-menu.component.html',
   styleUrls: ['./st-dropdown-menu.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StDropdownMenuComponent extends StDropdownMenuUtils implements AfterViewInit, OnInit, OnChanges, OnDestroy {

   /* tslint:disable-next-line:max-line-length */
   /** @Input {StPopPlacement} [placement=StPopPlacement.BOTTOM_START] Possible positions of menu with respect element to attach */
   @Input() placement: StPopPlacement = StPopPlacement.BOTTOM_START;
   /** @Input {string} [emptyListMessage=''] Message to show in case of empty list */
   @Input() emptyListMessage: string = '';
   /** @Input {StDropDownMenuItem | undefined} [selectedItem=undefined] Define selected item without passing as property */
   @Input() selectedItem: StDropDownMenuItem = undefined;
   /** @Input {StDropDownMenuItem | undefined} [itemsBeforeScroll=undefined] Define selected item without passing as property */
   @Input() itemsBeforeScroll: number = 8;
   /** @Input {boolean} [moveSelected=true] If true, move selected item to top in menu when open */
   @Input() moveSelected: boolean = true;
   /** @Input {boolean} [styleSelected=true] If true, apply class selected to selected item */
   @Input() styleSelected: boolean = true;
   /** @Input {StPopOffset} [offset={x: 0 , y: 0}] For position with offset in x o y axis */
   @Input() offset: StPopOffset = { x: 0, y: 0 };
   /** @Input {boolean} [openToLeft=false] For calculating all positions from the right corner */
   @Input() openToLeft: boolean = false;
   /** @Input {StDropdownVisualMode} [visualMode=StDropDownVisualMode.OPTION_LIST] It is needed to specify the styles applied to the list.
    *  By default is displayed as a normal option list
    */
   @Input() visualMode: StDropDownVisualMode = StDropDownVisualMode.OPTION_LIST;
   /** @Input {boolean} [keyBoardMove=false] It is needed to activate navigation through options using the keyboard
    */
   @Input() keyBoardMove: boolean = false;

   /** @output {StDropDownMenuItem} [change] Event emitted when user select an item */
   @Output() change: EventEmitter<StDropDownMenuItem> = new EventEmitter<StDropDownMenuItem>();

   /** @output {any} [scrollAtBottom] Event emitted when scroll reach the end of the list */
   @Output() scrollAtBottom: EventEmitter<any> = new EventEmitter<any>();
   /** @output {StDropDownMenuItem} [itemMouseEnter] Event emitted when mouse is over an item */
   @Output() itemMouseEnter: EventEmitter<StDropDownMenuItem> = new EventEmitter<StDropDownMenuItem>();
   /** @output {StDropDownMenuItem} [itemMouseLeave] Event emitted when mouse leaves an item */
   @Output() itemMouseLeave: EventEmitter<StDropDownMenuItem> = new EventEmitter<StDropDownMenuItem>();

   @ViewChild('buttonId') buttonElement: ElementRef;
   @ViewChild('itemList') itemListElement: ElementRef;
   @ViewChild('hiddenTypedText') hiddenTypedText: ElementRef;

   widthMenu: string = '0px';
   public focusedOptionPos: number = -1;

   private _itemHeight: number = 42;
   private _focusListenerFn: () => void;
   private _lastKeyTimestamp: number;
   private _items: StDropDownMenuItem[] | StDropDownMenuGroup[];
   private _flatItems: StDropDownMenuItem[] = [];
   private _active: boolean;
   private cleanTypedTextTimer: ReturnType<typeof setTimeout>;

   constructor(private el: ElementRef, private cd: ChangeDetectorRef, private renderer: Renderer2) {
      super();
   }

   /** @Input {StDropDownMenuItem[] | StDropDownMenuGroup[]} [items=\[\]] List of items or groups of them to show in menu */
   @Input()
   set items(items: StDropDownMenuItem[] | StDropDownMenuGroup[]) {
      this._items = items;
      this._updateFlatOptions();
   }

   get items(): StDropDownMenuItem[] | StDropDownMenuGroup[] {
      return this._items;
   }

   /** @Input {boolean} [active=false] Show or hide list */
   @Input()
   set active(active: boolean) {
      this._active = active;
      this._resetFilterAndFocusData();
   }

   get active(): boolean {
      return this._active;
   }

   ngOnInit(): void {
      if (this.keyBoardMove) {
         this._focusListenerFn = this.renderer.listen(this.el.nativeElement, 'keydown', this.arrowKeyListener.bind(this));
      }
   }

   get componentId(): string | null {
      const id = (this.el.nativeElement as HTMLElement).getAttribute('id');
      return id !== undefined && id !== null ? id : null;
   }

   get menuId(): string | null {
      return this.componentId !== null ? `${this.componentId}-menu` : null;
   }

   get isItemGroup(): boolean {
      return this.isDropDownGroup(this.items);
   }

   get menuMaxHeight(): string {
      return this.itemsBeforeScroll ? `${this._itemHeight * this.itemsBeforeScroll}px` : null;
   }

   get listClasses(): any {
      return { 'st-dropdown-menu': true, 'active': this.active, 'menu-list': this.displayAsMenuList() };
   }

   getItemId(value: any | undefined): string | null {
      return this.componentId !== null && value !== undefined ? `${this.componentId}-option-${this.getMergedItemValue(value)}` : null;
   }

   getGroupedOptionAbsolutePosition(item: StDropDownMenuItem): number {
      return this._flatItems.findIndex(_item => _item === item);
   }

   ngAfterViewInit(): void {
      this.updateWidth();
   }

   ngOnChanges(changes: SimpleChanges): void {
      if (changes?.active && this.selectedItem && this.moveSelected) {
         this._moveScrollToCurrentOption();
      } else {
         if (changes?.active && !changes.active.currentValue) {
            this.focusedOptionPos = -1;
         }
      }
   }

   onChange(value: StDropDownMenuItem): void {
      this.change.emit(value);
   }

   onHandleScroll(): void {
      const element = this.itemListElement.nativeElement;
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
         this.scrollAtBottom.emit();
      }
   }

   onMouseEnter(item: StDropDownMenuItem, optionPosition: number): void {
      this.itemMouseEnter.emit(item);
      this.focusedOptionPos = optionPosition;
      this._focusCurrentOption();
   }

   onMouseLeave(item: StDropDownMenuItem): void {
      this.itemMouseLeave.emit(item);
   }

   displayAsMenuList(): boolean {
      return this.visualMode === StDropDownVisualMode.MENU_LIST;
   }

   @HostListener('window:resize')
   @HostListener('window:load')
   updateWidth(): void {
      const button: HTMLElement = this.buttonElement.nativeElement;
      setTimeout(() => {
         if (button.children && button.children.length > 0) {
            this.widthMenu = button.children[0].getBoundingClientRect().width + 'px';
         } else {
            this.widthMenu = button.getBoundingClientRect().width + 'px';
         }
         this.cd.markForCheck();
      });

   }

   ngOnDestroy(): void {
      if (this._focusListenerFn) {
         this._focusListenerFn();
      }
   }

   private getSelectedItemPosition(): number {
      if (this.selectedItem && this._items) {
         let _items: StDropDownMenuItem[] = [];
         if (this.isDropDownGroup(this._items)) {
            this._items.forEach((item: StDropDownMenuItem | StDropDownMenuGroup) => {
               if ((<StDropDownMenuGroup> item).items) {
                  _items.push(...(<StDropDownMenuGroup> item).items);
               } else {
                  _items.push((<StDropDownMenuItem> item));
               }
            });
         } else {
            _items = this._items;
         }
         return _items.findIndex(item => item.value === this.selectedItem.value);
      } else {
         return -1;
      }
   }

   private arrowKeyListener(event: KeyboardEvent): void {
      if (event.code === ARROW_KEY_CODE.ARROW_DOWN || event.code === ARROW_KEY_CODE.ARROW_UP) {
         let nextFocus: number;
         event.preventDefault();
         event.stopPropagation();
         const selectedItemPosition = this.focusedOptionPos >= 0 ? this.focusedOptionPos : this.getSelectedItemPosition();
         if (selectedItemPosition > -1 && this.focusedOptionPos < 0) {
            this.focusedOptionPos = selectedItemPosition;
         }
         const options: HTMLLIElement[] = this.el.nativeElement.querySelectorAll('.st-dropdown-menu-item');
         nextFocus = (event.code === ARROW_KEY_CODE.ARROW_DOWN || this.focusedOptionPos === -1) ? 1 : -1;
         this.focusedOptionPos = this.focusedOptionPos + nextFocus;
         this.focusedOptionPos = this.focusedOptionPos < 0 ? options.length - 1 : (this.focusedOptionPos > options.length - 1 ? 0 : this.focusedOptionPos);
         if (options[this.focusedOptionPos]) {
            options[this.focusedOptionPos].focus();
            this.hiddenTypedText.nativeElement.focus();
            this.hiddenTypedText.nativeElement.innerText = '';
         }
         this.cd.markForCheck();
      }
   }

   moveFocusedOption(event: KeyboardEvent): void {
      if (this.keyBoardMove && event.key !== ARROW_KEY_CODE.ARROW_DOWN && event.key !== ARROW_KEY_CODE.ARROW_UP) {
         event.preventDefault();
         const typedText: string = this.hiddenTypedText.nativeElement.innerText;
         if (typedText) {
            const foundItemPos: number = this.searchFirstMatchedOptionPosition(typedText);
            if (foundItemPos === -1 && typedText.length > 1 && typedText[typedText.length - 2] === typedText[typedText.length - 1]) {
               this.hiddenTypedText.nativeElement.innerText = typedText.substring(0, 1);
               this.moveFocusedOption(event);
            }
            if (foundItemPos > -1) {
               this.onMouseEnter(this._flatItems[foundItemPos], foundItemPos);
               this.focusedOptionPos = foundItemPos;
               this._focusCurrentOption();
            }
            this.cd.markForCheck();
         }
      }
   }

   saveTypedText(event: KeyboardEvent): void {
      if (this.keyBoardMove) {
         if (event.code === ENTER_KEY_CODE || event.code === SPACE_KEY_CODE) {
            event.preventDefault();
            this.onChange(this.focusedOptionPos > -1 ? this._flatItems[this.focusedOptionPos] : undefined);
         } else {
            if (!this.isMenuControlKey(event.code)) {
               event.stopPropagation();
               this._lastKeyTimestamp = event.timeStamp;
               if (this.cleanTypedTextTimer) {
                  clearTimeout(this.cleanTypedTextTimer);
               }
               this.cleanTypedTextTimer = setTimeout(() => {
                  this.hiddenTypedText.nativeElement.innerText = '';
               }, 1000);
            }
         }
      }
   }

   private getSelectedOrFocusedOptionPosition(): number {
      return this.focusedOptionPos > -1 ? this.focusedOptionPos : (this.selectedItem ?
         this._flatItems.findIndex(_option => _option.value === this.selectedItem.value) : -1);
   }

   private searchFirstMatchedOptionPosition(searchText: string): number {
      const firstOptionPos: number = this.getSelectedOrFocusedOptionPosition();
      let foundOptionPos: number;
      if (firstOptionPos > -1) {
         foundOptionPos = this._searchOptionPositionByText(this._flatItems.slice(firstOptionPos + 1, this._flatItems.length), searchText);
         if (foundOptionPos === -1) {
            foundOptionPos = this._searchOptionPositionByText(this._flatItems.slice(0, firstOptionPos + 1), searchText);
         } else {
            foundOptionPos = foundOptionPos + firstOptionPos + 1;
         }
      } else {
         foundOptionPos = this._searchOptionPositionByText(this._flatItems, searchText);
      }
      return foundOptionPos;
   }

   private _updateFlatOptions(): void {
      this._flatItems = [];
      if (this._items) {
         this._items.forEach(_item => {
            if (_item.items) {
               this._flatItems = this._flatItems.concat(_item.items);
            } else {
               this._flatItems.push(_item);
            }
         });
      }
   }

   private _focusCurrentOption(): void {
      if (this.itemListElement && this.itemListElement.nativeElement && this._active) {
         const options: HTMLLIElement[] = this.itemListElement.nativeElement.querySelectorAll('li');
         if (options && options.length && this.focusedOptionPos >= 0 && this.focusedOptionPos < options.length) {
            options[this.focusedOptionPos].focus();
            this.hiddenTypedText.nativeElement.focus();
         }
      }
   }

   private _searchOptionPositionByText(list: StDropDownMenuItem[], searchText: string): number {
      return list.findIndex(_option => _option.label.substring(0, searchText.length).toLowerCase() === searchText.toLowerCase());
   }

   private _moveScrollToCurrentOption(): void {
      setTimeout(() => {
         if (this.itemListElement) {
            const parent: HTMLElement = this.itemListElement.nativeElement;
            const currentItem: HTMLElement = parent.querySelector('.focus') || parent.querySelector('.selected');
            if (currentItem && !this.elementIsVisible(currentItem, parent)) {
               parent.scrollTop = currentItem.offsetTop - parent.offsetTop;
               this.cd.markForCheck();
            }
         }
      });
   }

   private _resetFilterAndFocusData(): void {
      this.focusedOptionPos = -1;
      if (this._active && this.hiddenTypedText && this.hiddenTypedText.nativeElement) {
         this.hiddenTypedText.nativeElement.innerText = '';
         this.hiddenTypedText.nativeElement.focus();
      }
   }

}
