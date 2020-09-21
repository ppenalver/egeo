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
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

import {SdsAlertConfig, SdsAlertIcon, SdsAlertPosition, SdsAlertTriggerOptions, SdsAlertType} from './sds-alert.model';

@Injectable()
export class SdsAlertService {
   public trigger$: Subject<SdsAlertTriggerOptions>;
   public cancelTimeout$: Subject<void>;
   public cancelCurrentAlert$: Subject<void>;
   public readonly DEFAULT_CONFIG: SdsAlertConfig;

   private _alertsQueue: SdsAlertConfig[];
   private _consumingQueue: boolean;

   constructor() {
      this._consumingQueue = false;
      this.trigger$ = new Subject();
      this.cancelTimeout$ = new Subject();
      this.cancelCurrentAlert$ = new Subject();
      this._alertsQueue = [];
      this.DEFAULT_CONFIG = {
         title: '',
         message: '',
         alertType: SdsAlertType.INFO,
         alertIcon: SdsAlertIcon.DEFAULT,
         closeIcon: true,
         margin: 10,
         position: SdsAlertPosition.TOP_RIGHT,
         positionReference: 'html',
         timeout: 6000,
         multipleTimeout: 0
      };
   }

   public getConsumingQueue(): boolean {
      return this._consumingQueue;
   }

   public addAlert(config: SdsAlertConfig = {}): void {
      const isConnectionLost = config.alertType === SdsAlertType.CONNECTION_LOST;

      if (isConnectionLost) {
         this._alertsQueue = [config, ...this._alertsQueue];
      } else {
         this._alertsQueue.push(config);
      }

      const isMultiple = this._alertsQueue.length > 1 || isConnectionLost;
      if (isMultiple) {
         this.cancelTimeout$.next();
      }

      if ((this._alertsQueue.length === 1 && !this._consumingQueue) || isConnectionLost) {
         this._consumingQueue = true;
         this.trigger$.next({
            alertOptions: config,
            isMultiple
         });
      }
   }

   public cancelCurrentAlert(): void {
      this.cancelCurrentAlert$.next();
   }

   public removeAlert(): void {
      this._alertsQueue.shift();

      if (this._alertsQueue.length) {
         this.trigger$.next({
            alertOptions: this._alertsQueue[0],
            isMultiple: true
         });
      } else {
         this._consumingQueue = false;
      }
   }
}
