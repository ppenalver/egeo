import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {ElementModule} from '../../abstract/element.module';
import {StBreadCrumbsComponent, StBreadcrumbsModule} from '../../../../egeo/src/public_api';

@NgModule({
    imports: [BrowserModule, StBreadcrumbsModule],
    entryComponents: [StBreadCrumbsComponent]
})
export class StBreadcrumbsElementModule extends ElementModule {
    constructor(injector: Injector) {
        super(injector, StBreadCrumbsComponent, 'st-breadcrumbs');
    }
}
