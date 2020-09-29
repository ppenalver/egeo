import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { StInputElementModule } from './sds-input.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(StInputElementModule, { ngZone: 'noop'})
    .catch(err => console.error(err));
