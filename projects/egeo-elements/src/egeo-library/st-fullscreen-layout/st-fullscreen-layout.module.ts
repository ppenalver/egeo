import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {StFullscreenLayoutComponent, StFullscreenLayoutModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, StFullscreenLayoutModule],
    entryComponents: [StFullscreenLayoutComponent]
})
export class StFullscreenLayoutElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, StFullscreenLayoutComponent, 'st-fullscreen-layout');
    }
}
