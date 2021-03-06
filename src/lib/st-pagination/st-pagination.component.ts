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
   Input,
   OnChanges,
   OnInit,
   Output,
   SimpleChanges,
   ElementRef
} from '@angular/core';

import { StDropDownMenuItem } from '../st-dropdown-menu/st-dropdown-menu.interface';
import { Paginate, PaginateOptions, PaginateTexts } from './st-pagination.interface';

@Component({
   selector: 'st-pagination',
   templateUrl: './st-pagination.component.html',
   styleUrls: ['./st-pagination.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StPaginationComponent implements OnInit, OnChanges {
   @Input() currentPage: number = 1;
   @Input() perPage: number = 20;
   @Input() total: number;

   @Input() label: PaginateTexts =  {
      element: 'Rows', perPage: 'per page', of: 'of'
   };

   @Input() perPageOptions: PaginateOptions[] = [
      { value: 20, showFrom: 0 }, { value: 50, showFrom: 50 }, { value: 200, showFrom: 200 }
   ];

   @Output() change: EventEmitter<Paginate> = new EventEmitter<Paginate>();

   public disableNextButton: boolean = false;
   public disablePrevButton: boolean = true;
   public firstItem: number;
   public lastItem: number;
   public items: StDropDownMenuItem[] = [];
   public selectedItem: StDropDownMenuItem;

   constructor(
      private _cd: ChangeDetectorRef,
      private _paginationElement: ElementRef
   ) {
   }

   get hasOptions(): boolean {
      return this.items && this.items.length > 1;
   }

   get paginationId(): string | null {
      const pagination: HTMLElement = this._paginationElement.nativeElement;
      return pagination.getAttribute('id') !== null ? pagination.id : null;
   }

   get selectId(): string {
      return this.paginationId !== null ? `${this.paginationId}-select` : null;
   }

   get buttonPrevId(): string {
      return this.paginationId !== null ? `${this.paginationId}-prev` : null;
   }

   get buttonNextId(): string {
      return this.paginationId !== null ? `${this.paginationId}-next` : null;
   }

   ngOnInit(): void {
      this.updatePages(false);
      this.generateItems();
   }

   ngOnChanges(changes: SimpleChanges): void {
      if (changes.total && !changes.total.firstChange) {
         this.generateItems();
         this.updatePages(false);
      }

      if (changes.currentPage || changes.perPage) {
         this.updatePages(false);
      }
   }

   generateItems(): void {
      this.items = [];
      this.perPageOptions.forEach(this.addPageOption.bind(this));

      if (this.items.length) {
         this.selectedItem = this.items.find(item => item.value === this.perPage) || this.items[0];
      }

      this._cd.markForCheck();
   }

   nextPage(): void {
      this.currentPage++;
      this.updatePages();
   }

   prevPage(): void {
      this.currentPage--;
      this.updatePages();
   }

   updatePages(emit: boolean = true): void {
      this.lastItem = this.perPage * this.currentPage;

      if (this.currentPage === 1) {
         this.firstItem = this.currentPage;
         this.disablePrevButton = true;
      } else {
         this.firstItem = this.perPage * (this.currentPage - 1) + 1;
         this.disablePrevButton = false;
      }

      if (this.lastItem >= this.total) {
         this.lastItem = this.total;
         this.disableNextButton = true;
      } else {
         this.disableNextButton = false;
      }

      if (emit) {
         this.change.emit({
            currentPage: this.currentPage,
            perPage: this.perPage
         });
      }
   }

   onChangePerPage(perPage: number): void {
      this.currentPage = 1;
      this.perPage = perPage;
      this.updatePages();
      this.selectedItem = this.items.find(item => item.value === this.perPage);
   }

   private addPageOption(option: PaginateOptions): void {
      if (this.total && (!option.showFrom || option.showFrom <= this.total)) {
         this.items.push({
            label: `${option.value}`,
            value: option.value
         });
      }
   }
}
