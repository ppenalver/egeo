import {Injectable} from '@angular/core';
import {
   SdsNotificationDisplayOptions,
   SdsNotificationIcon,
   SdsNotificationPosition, SdsNotificationTriggerOptions,
   SdsNotificationType
} from './sds-notification.model';
import {Subject} from 'rxjs';

@Injectable()
export class SdsNotificationService {
   public trigger$: Subject<SdsNotificationTriggerOptions>;
   public cancelTimeout$: Subject<void>;
   public readonly DEFAULT_CONFIG: SdsNotificationDisplayOptions;

   private _notificationsQueue: SdsNotificationDisplayOptions[];
   private _consumingQueue: boolean;

   constructor() {
      this._consumingQueue = false;
      this.trigger$ = new Subject();
      this.cancelTimeout$ = new Subject();
      this._notificationsQueue = [];
      this.DEFAULT_CONFIG = {
         message: '',
         notificationType: SdsNotificationType.INFO,
         notificationIcon: SdsNotificationIcon.DEFAULT,
         closeIcon: true,
         margin: 10,
         maxWidth: '50vw',
         position: SdsNotificationPosition.TOP_CENTER,
         positionReference: 'html',
         timeout: 6000,
         multipleTimeout: 0
      };
   }

   public getConsumingQueue(): boolean {
      return this._consumingQueue;
   }

   public addNotification(config: SdsNotificationDisplayOptions = {}): void {
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
