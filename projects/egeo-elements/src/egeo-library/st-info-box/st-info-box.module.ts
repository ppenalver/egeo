import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {StInfoBoxComponent, StInfoBoxModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, StInfoBoxModule],
    entryComponents: [StInfoBoxComponent]
})
export class StInfoBoxElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, StInfoBoxComponent, 'st-info-box');
    }
}
