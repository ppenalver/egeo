import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {SdsCheckboxComponent, SdsCheckboxModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, SdsCheckboxModule],
    entryComponents: [SdsCheckboxComponent]
})
export class StCheckboxElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, SdsCheckboxComponent, 'sds-checkbox');
    }
}
