import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { StHeaderElementModule } from './st-header.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(StHeaderElementModule, { ngZone: 'noop'})
    .catch(err => console.error(err));
