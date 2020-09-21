import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { SdsTabElementModule } from './sds-tab.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(SdsTabElementModule, { ngZone: 'noop'})
    .catch(err => console.error(err));
