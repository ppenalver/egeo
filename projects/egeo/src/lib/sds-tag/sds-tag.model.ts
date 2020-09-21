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

export enum SdsTagType {
   INFORMATIVE = 'informative',
   INTERACTIVE = 'interactive'
}

export enum SdsTagStyle {
   DEFAULT = 'default',
   INFO = 'info',
   CRITICAL = 'critical',
   WARNING = 'warning',
   SUCCESS = 'success'
}

export enum SdsTagSize {
   REGULAR = 'regular',
   MEDIUM = 'medium',
   SMALL = 'small'
}

export enum SdsTagInteractiveMode {
   TRIGGER = 'trigger',
   SELECTION = 'selection'
}

export interface SdsTagConfig {
   text?: string;
   iconLeft?: string;
   iconRight?: string;
   iconRightClickable?: boolean;
   style?: SdsTagStyle;
   size?: SdsTagSize;
   tagType?: SdsTagType;
   interactiveMode?: SdsTagInteractiveMode;
}
