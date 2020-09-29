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

export enum SdsModalType {
   CUSTOM_CONTENT = 'custom_content',
   INFORMATION = 'information',
   WARNING = 'warning',
   ERROR = 'error'
}

export enum SdsInputIconActions {
   CLEAR_INPUT = 'clear-input'
}

export interface SdsModalConfig {
   modalType?: SdsModalType;
   title?: string;
   closeControl?: boolean;
   enableAnimation?: boolean;
   animationTime?: number;
   fullWindow?: boolean;
   clickOutside?: boolean;
   width?: number;
   height?: number;
   showDefaultHeader?: boolean;
   actionButtonLabel?: string;
   cancelButtonLabel?: string;
}
