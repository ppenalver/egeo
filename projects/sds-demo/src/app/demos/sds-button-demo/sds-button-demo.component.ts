/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
import {ChangeDetectorRef, Component} from '@angular/core';
import {CssProperty} from '@app/shared/css-property-table/css-property-table.model';
import {FormControl} from '@angular/forms';
import {SdsButtonConfig} from '@stratio/egeo';
import {SdsButtonIconType, SdsButtonSize, SdsButtonType} from '../../../../../egeo/src/lib/sds-button/sds-button.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
   selector: 'sds-button-demo',
   templateUrl: './sds-button-demo.component.html',
   styleUrls: ['./sds-button-demo.component.scss'],
   animations: [
      trigger('fade', [
         state('void', style({opacity: 0})),
         state('*', style({opacity: 1})),
         transition(':enter', [animate(300)]),
         transition(':leave', [animate(300)])
      ])
   ]
})

export class SdsButtonDemoComponent {
   public configDoc: Record<string, string> = {
      html: 'demo/sds-button-demo/sds-button-demo.component.html',
      ts: 'demo/sds-button-demo/sds-button-demo.component.ts'
   };
   public cssProperties: CssProperty[] = [
      {
         name: '--egeo-sds-button--font-size',
         description: 'Button font size',
         default: '$egeo-font-size-14'
      },
      {
         name: '--egeo-sds-button--line-height',
         description: 'Button line height',
         default: '$egeo-line-height-18'
      },
      {
         name: '--egeo-sds-button__small--font-size',
         description: 'Small button font size',
         default: '$egeo-font-size-12'
      },
      {
         name: '--egeo-sds-button__small--line-height',
         description: 'Small button line height',
         default: '$egeo-line-height-18'
      },
      {
         name: '--egeo-sds-button__icon--font-size',
         description: 'Icon button font size',
         default: '$egeo-font-size-16'
      },
      {
         name: '--egeo-sds-button__icon--line-height',
         description: 'Icon button line height',
         default: '$egeo-line-height-18'
      },
      {
         name: '--egeo-sds-button__link--font-size',
         description: 'Link button font size',
         default: '$egeo-font-size-14'
      },
      {
         name: '--egeo-sds-button__link--line-height',
         description: 'Link button line height',
         default: '$egeo-line-height-20'
      },
      {
         name: '--egeo-sds-button__link__small--font-size',
         description: 'Small button link font size',
         default: '$egeo-font-size-12'
      },
      {
         name: '--egeo-sds-button__link__small--line-height',
         description: 'Small button link line height',
         default: '$egeo-line-height-18'
      },
      {
         name: '--egeo-sds-button--height',
         description: 'Button line height',
         default: '36px'
      },
      {
         name: '--egeo-sds-button__small--height',
         description: 'Small button line height',
         default: '30px'
      }
   ];

   public sizeOptions: Record<string, string>[] = [
      {label: 'Regular', value: 'regular'},
      {label: 'Small', value: 'small'}
   ];

   public typeOptions: Record<string, string>[] = [
      {label: 'Primary', value: 'primary'},
      {label: 'Secondary', value: 'secondary'},
      {label: 'Borderless', value: 'borderless'},
      {label: 'Critical', value: 'critical'}
   ];

   public iconTypeOptions: Record<string, string>[] = [
      {label: 'Icon Left', value: 'icon-left'},
      {label: 'Icon Right', value: 'icon-right'},
      {label: 'Only Icon', value: 'only-icon'}
   ];

   public iconLeftExamplesOptions: Record<string, string>[] = [
      {label: 'Example 1', value: 'icon-location-2'},
      {label: 'Example 2', value: 'icon-image'},
      {label: 'Example 3', value: 'icon-link'},
      {label: 'Example 4', value: 'icon-github2'}
   ];

   public iconRightExamplesOptions: Record<string, string>[] = [
      {label: 'Example 1', value: 'icon-arrow2_down'},
      {label: 'Example 2', value: 'icon-scissors'},
      {label: 'Example 3', value: 'icon-trending-up'},
      {label: 'Example 4', value: 'icon-location'}
   ];

   public onlyIconExamplesOptions: Record<string, string>[] = [
      {label: 'Example 1', value: 'icon-waiting'},
      {label: 'Example 2', value: 'icon-nodes'},
      {label: 'Example 3', value: 'icon-bell'},
      {label: 'Example 4', value: 'icon-rotate-cw'}
   ];

   public typeControl: FormControl = new FormControl(SdsButtonType.PRIMARY);
   public sizeControl: FormControl = new FormControl(SdsButtonSize.REGULAR);
   public textControl: FormControl = new FormControl('Cool button');
   public disabledControl: FormControl = new FormControl(false);
   public iconControl: FormControl = new FormControl(false);
   public spinnerControl: FormControl = new FormControl(false);
   public iconTypeControl: FormControl = new FormControl(SdsButtonIconType.ICON_LEFT);
   public iconLeftExamplesControl: FormControl = new FormControl('icon-location-2');
   public iconRightExamplesControl: FormControl = new FormControl('icon-arrow2_down');
   public onlyIconExamplesControl: FormControl = new FormControl('icon-waiting');
   public buttonConfig: SdsButtonConfig = {
      text: 'Cool button',
      type: SdsButtonType.PRIMARY,
      icon: '',
      size: SdsButtonSize.REGULAR
   };
   public showPressMessage: boolean;
   public message: string = 'Press to trigger an action with loading spinner.';

   private componentDestroyed$: Subject<void> = new Subject<void>();

   constructor(private cd: ChangeDetectorRef) {
      this.sizeControl.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            this.buttonConfig = {...this.buttonConfig, size: val};
         });

      this.typeControl.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            this.buttonConfig = {...this.buttonConfig, type: val};
         });

      this.textControl.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            this.buttonConfig = {...this.buttonConfig, text: val};
         });

      this.spinnerControl.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            this.showPressMessage = val;
            if (val) {
               this.disabledControl.setValue(false);
               this.disabledControl.disable({emitEvent: false});
            } else {
               this.disabledControl.enable({emitEvent: false});
            }
         });

      this.iconControl.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            this.iconTypeControl.setValue(val ? SdsButtonIconType.ICON_LEFT : '');
         });

      this.iconTypeControl.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            this.buttonConfig = {...this.buttonConfig, iconType: val};
            this.textControl.enable({emitEvent: false});
            if (val === 'icon-left') {
               this.iconLeftExamplesControl.setValue('icon-location-2');
            } else if (val === 'icon-right') {
               this.iconRightExamplesControl.setValue('icon-arrow2_down');
            } else {
               this.onlyIconExamplesControl.setValue('icon-waiting');
               this.textControl.disable({emitEvent: false});
            }
         });

      this.iconLeftExamplesControl.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            this.buttonConfig = {...this.buttonConfig, icon: val};
         });

      this.iconRightExamplesControl.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            this.buttonConfig = {...this.buttonConfig, icon: val};
         });

      this.onlyIconExamplesControl.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            this.buttonConfig = {...this.buttonConfig, icon: val};
         });

      this.disabledControl.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            if (val) {
               this.spinnerControl.setValue(false);
               this.spinnerControl.disable({emitEvent: false});
            } else {
               this.spinnerControl.enable({emitEvent: false});
            }
         });
   }

   public onButtonClick(): void {
      if (this.spinnerControl.value && !this.buttonConfig.showSpinner) {
         this.message = 'Loading...';
         this.buttonConfig = {...this.buttonConfig, showSpinner: true};
         setTimeout(() => {
            this.message = 'Press to trigger an action with loading spinner.';
            this.buttonConfig = {...this.buttonConfig, showSpinner: false};
            this.cd.markForCheck();
         }, 2000);
      }

   }
}
