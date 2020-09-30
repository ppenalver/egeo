import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { SdsModalElementModule } from './sds-modal.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(SdsModalElementModule, { ngZone: 'noop'})
    .catch(err => console.error(err));
