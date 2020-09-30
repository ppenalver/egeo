import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {SdsSwitchComponent, SdsSwitchModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, SdsSwitchModule],
    entryComponents: [SdsSwitchComponent]
})
export class StSwitchElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, SdsSwitchComponent, 'sds-switch');
    }
}
