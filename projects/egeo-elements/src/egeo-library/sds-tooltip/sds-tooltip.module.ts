import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {SdsTooltipComponent, SdsTooltipModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, SdsTooltipModule],
    entryComponents: [SdsTooltipComponent]
})
export class SdsTooltipElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, SdsTooltipComponent, 'sds-tooltip');
    }
}
