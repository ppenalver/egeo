import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { StTagInputElementModule } from './st-tag-input.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(StTagInputElementModule, { ngZone: 'noop'})
    .catch(err => console.error(err));
