import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {SdsModalComponent, SdsModalModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, SdsModalModule],
    entryComponents: [SdsModalComponent]
})
export class SdsModalElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, SdsModalComponent, 'sds-modal');
    }
}
