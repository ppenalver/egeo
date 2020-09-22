import {NgModule} from '@angular/core';
import {SdsButtonComponent} from './sds-button.component';
import {CommonModule} from '@angular/common';
import {SdsSpinnerModule} from '../sds-spinner/sds-spinner.module';
import {SdsButtonSpinnerDirective} from './sds-button-spinner.directive';


@NgModule({
   declarations: [SdsButtonComponent, SdsButtonSpinnerDirective],
   imports: [CommonModule, SdsSpinnerModule],
   exports: [SdsButtonComponent, SdsButtonSpinnerDirective]
})
export class SdsButtonModule {}
