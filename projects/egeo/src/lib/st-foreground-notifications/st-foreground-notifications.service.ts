import {Injectable} from '@angular/core';
import {
   StNotificationDisplayOptions,
   StNotificationIcon,
   StNotificationPosition, StNotificationTriggerOptions,
   StNotificationType
} from './st-foreground-notifications.model';
import {Subject} from 'rxjs';

@Injectable()
export class StForegroundNotificationsService {
   public trigger$: Subject<StNotificationTriggerOptions>;
   public cancelTimeout$: Subject<void>;
   public readonly DEFAULT_CONFIG: StNotificationDisplayOptions;

   private _notificationsQueue: StNotificationDisplayOptions[];
   private _consumingQueue: boolean;

   constructor() {
      this._consumingQueue = false;
      this.trigger$ = new Subject();
      this.cancelTimeout$ = new Subject();
      this._notificationsQueue = [];
      this.DEFAULT_CONFIG = {
         message: '',
         notificationType: StNotificationType.INFO,
         notificationIcon: StNotificationIcon.DEFAULT,
         closeIcon: true,
         margin: 10,
         width: '50vw',
         position: StNotificationPosition.TOP_CENTER,
         positionReference: 'html',
         infoTimeout: 6000,
         successTimeout: 6000,
         warningTimeout: 6000,
         criticalTimeout: 0,
         multipleTimeout: 0
      };
   }

   public getConsumingQueue(): boolean {
      return this._consumingQueue;
   }

   public addNotification(config: StNotificationDisplayOptions = {}): void {
      this._notificationsQueue.push(config);

      const isMultiple = this._notificationsQueue.length > 1;
      if (isMultiple) {
         this.cancelTimeout$.next();
      }

      if (this._notificationsQueue.length === 1 && !this._consumingQueue) {
         this._consumingQueue = true;
         this.trigger$.next({
            notificationOptions: config,
            isMultiple
         });
      }
   }

   public removeNotification(): void {
      this._notificationsQueue.shift();

      if (this._notificationsQueue.length) {
         this.trigger$.next({
            notificationOptions: this._notificationsQueue[0],
            isMultiple: true
         });
      } else {
         this._consumingQueue = false;
      }
   }
}
