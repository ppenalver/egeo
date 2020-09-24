/**
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
import {SdsLinkSize} from './sds-link.model';


@Component({
   selector: 'sds-link',
   templateUrl: 'sds-link.component.html',
   styleUrls: ['sds-link.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class SdsLinkComponent {
   @Input() text: string;
   @Input() icon: string;
   @Input() underline: boolean;
   @Input() inverseUnderline: boolean;
   @Input() size: SdsLinkSize;

   @Output() linkClick: EventEmitter<void>;

   public sdsLinkSize: typeof SdsLinkSize;

   constructor() {
      this.sdsLinkSize = SdsLinkSize;
      this.linkClick = new EventEmitter<void>();
   }
}
