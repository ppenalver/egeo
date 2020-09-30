import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { SdsTextareaElementModule } from './st-text-area.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(SdsTextareaElementModule, { ngZone: 'noop'})
    .catch(err => console.error(err));
