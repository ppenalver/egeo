import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { SdsTooltipElementModule } from './sds-tooltip.module';

enableProdMode();

platformBrowserDynamic()
    .bootstrapModule(SdsTooltipElementModule, { ngZone: 'noop'})
    .catch(err => console.error(err));
