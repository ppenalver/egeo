import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { StInfoBoxElementModule } from './st-info-box.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(StInfoBoxElementModule, { ngZone: 'noop'})
    .catch(err => console.error(err));
