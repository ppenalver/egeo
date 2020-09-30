import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { StSelectElementModule } from './st-select.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(StSelectElementModule, { ngZone: 'noop'})
    .catch(err => console.error(err));
