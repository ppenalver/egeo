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
import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SdsTab, SdsTabSize} from './sds-tab.model';
import {StEgeo, StRequired} from '../decorators/require-decorators';

/**
 * @description {Component} [Tab]
 *
 * Tab is a navigation component that divides content into separate views hiding the ones that the user is not focused in.
 *
 * @model
 *
 *   [Id, text and optional status of a tab] {./sds-tab.model.ts#StSdsTab}
 *
 * @example
 *
 * {html}
 *
 * ```
 * <sds-tab [options]="options" [qaTag]="qaTag">
 * </sds-tab>
 * ```
 *
 */
@Component({
   selector: 'sds-tab',
   templateUrl: './sds-tab.component.html',
   styleUrls: ['./sds-tab.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

@StEgeo()
export class SdsTabComponent implements OnInit {
   /** @Input {SdsTab} [activeOption=''] Current active option */
   @Input() activeOption: SdsTab;

   /** @Input {boolean} [borderBottom=false] If true, applies a border-bottom on the entire component. */
   @Input() borderBottom: boolean;

   /** @Input {SdsTabSize} [size='regular'] Set component's size. */
   @Input() size: SdsTabSize;

   @StRequired() @Input() options: SdsTab[];
   /** @Input {string} [qaTag=''] Prefix used to generate the id values for qa tests */
   @Input() qaTag: string;
   /** @Output {SdsTab} [changedOption=''] This event is emitted when active option has changed. It has the
    * active option name as param
    */
   @Output() changedOption: EventEmitter<SdsTab> = new EventEmitter<SdsTab>();

   public sdsTabSize: typeof SdsTabSize;

   constructor() {
      this.sdsTabSize = SdsTabSize;
   }


   ngOnInit(): void {
      if (this.options && this.options.length > 0) {
         this.activeOption = this.activeOption || this.options[0];
         this.activateOption(this.activeOption);
      }
   }

   isActive(option: SdsTab): boolean {
      return this.activeOption === option;
   }

   activateOption(option: SdsTab): void {
      this.activeOption = option;
      this.changedOption.emit(option);
   }
}
