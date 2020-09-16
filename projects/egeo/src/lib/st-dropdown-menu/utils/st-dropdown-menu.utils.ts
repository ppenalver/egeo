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

import { MENU_CONTROL_KEYS, StDropDownMenuGroup, StDropDownMenuItem } from '../st-dropdown-menu.interface';

export class StDropdownMenuUtils {

   protected isDropDownGroup(value: StDropDownMenuItem[] | StDropDownMenuGroup[]): value is StDropDownMenuGroup[] {
      return value?.length > 0 && (<StDropDownMenuGroup>value[0]).title !== undefined;
   }

   protected elementIsVisible(option: HTMLElement, menu: HTMLElement): boolean {
      const menuTop: number = menu.scrollTop;
      const menuBottom: number = menuTop + menu.clientHeight;
      const optionTop: number = option.offsetTop - menu.offsetTop;
      const optionBottom: number = optionTop + option.clientHeight;

      return  optionTop >= menuTop && optionBottom <= menuBottom;
   }

   protected getMergedItemValue(value: any): string {
      return value.toString().replace(/\s+/g, '_');
   }

   protected isMenuControlKey(keyCode: string): boolean {
      return MENU_CONTROL_KEYS.indexOf(keyCode) !== -1;
   }

}
