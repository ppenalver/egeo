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

export enum StNotificationIcon {
   DEFAULT = 'default',
   NONE = 'none'
}

export enum StNotificationType {
   INFO = 'info',
   SUCCESS = 'success',
   WARNING = 'warning',
   CRITICAL = 'critical'
}

export enum StNotificationPosition {
   TOP_LEFT = 'top_left',
   TOP_CENTER = 'top_center',
   TOP_RIGHT = 'top_right',
   CENTER_LEFT = 'center_left',
   CENTER_CENTER = 'center_center',
   CENTER_RIGHT = 'center_right',
   BOTTOM_LEFT = 'bottom_left',
   BOTTOM_CENTER = 'bottom_center',
   BOTTOM_RIGHT = 'bottom_right'
}

export enum StNotificationState {
   SHOW = 'show',
   HIDE_CLOSE = 'hide_close',
   HIDE_AUTOCLOSE = 'hide_autoclose',
   HOT_RENDER = 'hot_render'
}

export interface StNotificationDisplayOptions {
   message?: string;
   closeIcon?: boolean;
   width?: string;
   notificationType?: StNotificationType;
   notificationIcon?: StNotificationIcon | string;
   position?: StNotificationPosition;
   positionReference?: string;
   infoTimeout?: number;
   successTimeout?: number;
   warningTimeout?: number;
   criticalTimeout?: number;
   multipleTimeout?: number;
   margin?: number;
}

export interface StNotificationTriggerOptions {
   notificationOptions: StNotificationDisplayOptions;
   isMultiple: boolean;
}
