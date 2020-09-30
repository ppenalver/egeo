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
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {SdsTagConfig, SdsTagInteractiveMode, SdsTagSize, SdsTagStyle, SdsTagType} from './sds-tag.model';


@Component({
   selector: 'sds-tag',
   templateUrl: './sds-tag.component.html',
   styleUrls: ['./sds-tag.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class SdsTagComponent {
   @Input() config: SdsTagConfig;
   @Input() isDisabled: boolean;

   @Output() tagClick: EventEmitter<void>;
   @Output() iconClick: EventEmitter<void>;

   public sdsTagType: typeof SdsTagType;
   public sdsTagInteractionMode: typeof SdsTagInteractiveMode;
   public sdsTagSize: typeof SdsTagSize;
   public sdsTagStyle: typeof SdsTagStyle;
   public isSelected: boolean;

   constructor() {
      this.sdsTagType = SdsTagType;
      this.sdsTagInteractionMode = SdsTagInteractiveMode;
      this.sdsTagSize = SdsTagSize;
      this.sdsTagStyle = SdsTagStyle;
      this.tagClick = new EventEmitter<void>();
      this.iconClick = new EventEmitter<void>();
   }

   public onTagClick(event: MouseEvent): void {
      const clickableClass: string = 'sds-tag__icon-right--clickable';
      if (this.isDisabled) {
         return;
      }

      if (this.config.interactiveMode === SdsTagInteractiveMode.SELECTION) {
         this.isSelected = !this.isSelected;
      } else if (this.config.tagType === SdsTagType.INTERACTIVE && !(event.target as HTMLElement).classList.contains(clickableClass)) {
         this.tagClick.emit();
      }
   }

   public onIconClick(event: MouseEvent): void {
      if (this.isDisabled) {
         return;
      }
      event.stopPropagation();

      if (this.config.iconRightClickable && this.config.tagType !== SdsTagType.INTERACTIVE) {
         this.iconClick.emit();
      }
   }
}
