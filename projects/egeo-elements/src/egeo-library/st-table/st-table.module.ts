import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {StTableComponent, StTableModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, StTableModule],
    entryComponents: [StTableComponent]
})
export class StTableElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, StTableComponent, 'st-table');
    }
}
