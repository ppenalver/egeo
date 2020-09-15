import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {SdsSpinnerComponent, SdsSpinnerModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, SdsSpinnerModule],
    entryComponents: [SdsSpinnerComponent]
})
export class StSpinnerElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, SdsSpinnerComponent, 'sds-spinner');
    }
}
