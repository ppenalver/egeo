import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {SdsNotificationComponent, SdsNotificationModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, SdsNotificationModule],
    entryComponents: [SdsNotificationComponent]
})
export class StForegroundNotificationsElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, SdsNotificationComponent, 'sds-notification');
    }
}
