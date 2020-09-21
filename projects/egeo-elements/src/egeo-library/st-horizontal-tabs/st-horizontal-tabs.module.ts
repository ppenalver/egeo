import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {SdsTabComponent, SdsTabModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, SdsTabModule],
    entryComponents: [SdsTabComponent]
})
export class SdsTabElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, SdsTabComponent, 'sds-tab');
    }
}
