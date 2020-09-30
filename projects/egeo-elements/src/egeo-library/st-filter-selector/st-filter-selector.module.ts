import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {StFilterSelectorComponent, StFilterSelectorModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, StFilterSelectorModule],
    entryComponents: [StFilterSelectorComponent]
})
export class StFilterSelectorElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, StFilterSelectorComponent, 'st-filter-selector');
    }
}
