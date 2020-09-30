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

export enum SdsNotificationIcon {
   DEFAULT = 'default',
   NONE = 'none'
}

export enum SdsNotificationType {
   INFO = 'info',
   SUCCESS = 'success',
   WARNING = 'warning',
   CRITICAL = 'critical'
}

export interface SdsNotificationDisplayOptions {
   message?: string;
   closeIcon?: boolean;
   maxWidth?: string;
   notificationType?: SdsNotificationType;
   notificationIcon?: SdsNotificationIcon | string;
   timeout?: number;
   infoTimeout?: number;
   successTimeout?: number;
   warningTimeout?: number;
   criticalTimeout?: number;
}

export interface SdsNotificationTriggerOptions {
   notificationOptions: SdsNotificationDisplayOptions;
   isMultiple: boolean;
}
