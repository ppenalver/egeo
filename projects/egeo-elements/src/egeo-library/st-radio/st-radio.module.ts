import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {SdsRadioComponent, SdsRadioModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, SdsRadioModule ],
    entryComponents: [SdsRadioComponent]
})
export class StRadioElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, SdsRadioComponent, 'sds-radio');
    }
}
