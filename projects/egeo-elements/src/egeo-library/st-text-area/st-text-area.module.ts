import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {SdsTextareaComponent, SdsTextareaModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, SdsTextareaModule],
    entryComponents: [SdsTextareaComponent]
})
export class SdsTextareaElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, SdsTextareaComponent, 'sds-textarea');
    }
}
