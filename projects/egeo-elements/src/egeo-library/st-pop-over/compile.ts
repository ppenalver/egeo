import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { StPopOverElementModule } from './st-pop-over.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(StPopOverElementModule, { ngZone: 'noop'})
    .catch(err => console.error(err));
