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
import { TranslateableElement } from '../utils/egeo-resolver/egeo-resolve-model';

export enum ARROW_KEY_CODE {ARROW_UP = 'ArrowUp', ARROW_DOWN = 'ArrowDown'}

export const ENTER_KEY_CODE = 'Enter';
export const SPACE_KEY_CODE = 'Space';
export const ESCAPE_KEY_CODE = 'Escape';
export const TAB_KEY_CODE = 'Tab';
export const SHIFT_KEY_CODE = 'Shift';

export const MENU_CONTROL_KEYS = [ARROW_KEY_CODE.ARROW_UP, ARROW_KEY_CODE.ARROW_DOWN,
   ENTER_KEY_CODE, SPACE_KEY_CODE, ESCAPE_KEY_CODE, TAB_KEY_CODE, SHIFT_KEY_CODE];

export class StDropDownMenuItem {
   label: string;
   value: any;
   icon?: string;
   labelColor?: string;
   iconColor?: string;
   textInfo?: string;
   selected?: boolean;
   hasHtml?: boolean;
   extraIcon?: string;
   extraIconBubble?: string;
   extraIconColor?: string;
   disabled?: boolean;
   topSeparator?: boolean;
   bottomSeparator?: boolean;

   [key: string]: any; // To do model more extensible if any other component needs to send more data
}

export class StDropDownMenuGroup {
   title?: string;
   items: StDropDownMenuItem[];
}

export class StDropDownMenuItemSchema {
   label: TranslateableElement;
   value: any;
   icon?: string;
   selected?: boolean;
}

export class StDropDownMenuGroupSchema {
   title?: TranslateableElement;
   items: StDropDownMenuItemSchema[];
}

export enum StDropDownVisualMode {
   OPTION_LIST, MENU_LIST
}
