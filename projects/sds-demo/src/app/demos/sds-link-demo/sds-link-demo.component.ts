/**
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';


@Component({
   selector: 'sds-link-demo',
   templateUrl: 'sds-link-demo.component.html',
   styleUrls: ['sds-link-demo.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   animations: [
      trigger('fade', [
         state('void', style({opacity: 0})),
         state('*', style({opacity: 1})),
         transition(':enter', [animate(300)]),
         transition(':leave', [animate(300)])
      ])
   ]
})
export class SdsLinkDemoComponent implements OnDestroy {
   public configDoc: Record<string, string> = {
      html: 'demo/sds-link-demo/sds-link-demo.html',
      ts: 'demo/sds-link-demo/sds-link-demo.ts',
      component: 'lib/sds-link/sds-link.component.ts'
   };
   public text: FormControl;
   public showIcon: FormControl;
   public iconExample: FormControl;
   public underline: FormControl;
   public inverseUnderline: FormControl;
   public size: FormControl;
   public exampleIconOptions: Record<string, string>[];
   public sizeOptions: Record<string, string>[];
   public showMessage: boolean;
   public messageTimeout: number;
   private componentDestroyed$: Subject<void>;

   constructor(private cd: ChangeDetectorRef) {
      this.componentDestroyed$ = new Subject<void>();
      this.text = new FormControl('Text Link');
      this.showIcon = new FormControl(false);
      this.iconExample = new FormControl('icon-circle-plus');
      this.underline = new FormControl(false);
      this.inverseUnderline = new FormControl(false);
      this.size = new FormControl('regular');

      this.exampleIconOptions = [
         {
            label: 'Example 1',
            value: 'icon-circle-plus'
         },
         {
            label: 'Example 2',
            value: 'icon-lock'
         },
         {
            label: 'Example 3',
            value: 'icon-link'
         },
         {
            label: 'Example 4',
            value: 'icon-user'
         }
      ];

      this.sizeOptions = [
         {
            label: 'Regular',
            value: 'regular'
         },
         {
            label: 'Small',
            value: 'small'
         }
      ];

      this.underline.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            if (val) {
               this.inverseUnderline.setValue(false);
            }
         });
   }

   public ngOnDestroy(): void {
      this.componentDestroyed$.next();
      this.componentDestroyed$.complete();
      this.componentDestroyed$.unsubscribe();
   }

   public showPressMessage(): void {
      this.showMessage = true;

      this.messageTimeout = setTimeout(() => {
         if (this.messageTimeout) {
            this.showMessage = false;
            this.cd.detectChanges();
            this.messageTimeout = null;
         }
      }, 2000);
   }
}
