import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {SdsInputComponent, SdsInputModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, SdsInputModule],
    entryComponents: [SdsInputComponent]
})
export class StInputElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, SdsInputComponent, 'sds-input');
    }
}
