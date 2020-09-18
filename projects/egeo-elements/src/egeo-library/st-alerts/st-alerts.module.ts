import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {SdsAlertComponent, SdsAlertModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, SdsAlertModule],
    entryComponents: [SdsAlertComponent]
})
export class StAlertsElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, SdsAlertComponent, 'sds-alert');
    }
}
