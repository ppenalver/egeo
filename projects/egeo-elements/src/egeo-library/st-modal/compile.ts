import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { StModalElementModule } from './st-modal.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(StModalElementModule, { ngZone: 'noop'})
    .catch(err => console.error(err));
