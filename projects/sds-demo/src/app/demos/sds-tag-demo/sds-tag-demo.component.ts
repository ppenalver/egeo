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

import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SdsTagConfig, SdsTagInteractiveMode, SdsTagSize, SdsTagStyle, SdsTagType} from '@stratio/egeo';

@Component({
   selector: 'st-button-demo',
   templateUrl: './sds-tag-demo.component.html',
   animations: [
      trigger('fade', [
         state('void', style({opacity: 0})),
         state('*', style({opacity: 1})),
         transition(':enter', [animate(300)]),
         transition(':leave', [animate(300)])
      ])
   ],
   styleUrls: ['./sds-tag-demo.component.scss']
})

export class SdsTagDemoComponent {
   public configDoc: any = {
      html: 'demo/st-button-demo/st-button-demo.component.html',
      ts: 'demo/st-button-demo/st-button-demo.component.ts'
   };


   public tagConfig: SdsTagConfig = {
      text: 'Cool tag',
      tagType: SdsTagType.INFORMATIVE,
      iconRight: '',
      iconLeft: '',
      interactiveMode: SdsTagInteractiveMode.SELECTION,
      iconRightClickable: false,
      size: SdsTagSize.REGULAR,
      style: SdsTagStyle.DEFAULT
   };

   public sizeOptions: any = [
      {
         label: 'Regular',
         value: 'regular'
      },
      {
         label: 'Medium',
         value: 'medium'
      },
      {
         label: 'Small',
         value: 'small'
      }
   ];

   public typeOptions: any = [
      {
         label: 'Informative',
         value: 'informative'
      },
      {
         label: 'Interactive',
         value: 'interactive'
      }
   ];

   public styleOptions: any = [
      {
         label: 'Default',
         value: 'default'
      },
      {
         label: 'Info',
         value: 'info'
      },
      {
         label: 'Critical',
         value: 'critical'
      },
      {
         label: 'Warning',
         value: 'warning'
      },
      {
         label: 'Success',
         value: 'success'
      }
   ];

   public interactiveModeOptions: any = [
      {
         label: 'Trigger',
         value: 'trigger'
      },
      {
         label: 'Selection',
         value: 'selection'
      }
   ];

   public iconLeftExamples: any = [
      {
         label: 'Example 1',
         value: 'icon-cog'
      },
      {
         label: 'Example 2',
         value: 'icon-edit-2'
      },
      {
         label: 'Example 3',
         value: 'icon-cloud'
      },
      {
         label: 'Example 4',
         value: 'icon-twitter'
      }
   ];

   public iconRightExamples: any = [
      {
         label: 'Example 1',
         value: 'icon-cross'
      },
      {
         label: 'Example 2',
         value: 'icon-export'
      },
      {
         label: 'Example 3',
         value: 'icon-users'
      },
      {
         label: 'Example 4',
         value: 'icon-trash'
      }
   ];

   public selected: boolean;
   public tagForm: FormGroup;
   public showMessage: boolean;
   public message: string;
   public messageTimeout: any;
   private componentDestroyed$: Subject<void> = new Subject<void>();

   constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
      this.tagForm = this.fb.group({
         size: this.fb.control('regular'),
         message: this.fb.control('Cool tag'),
         type: this.fb.control('informative'),
         style: this.fb.control('default'),
         icon: this.fb.control(false),
         iconLeft: this.fb.control(false),
         iconRight: this.fb.control(false),
         iconLeftExamples: this.fb.control('icon-cog'),
         iconRightExamples: this.fb.control('icon-cross'),
         iconRightAction: this.fb.control(false),
         interactiveMode: this.fb.control('trigger'),
         disabled: this.fb.control(false)
      });

      this.tagForm.valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe(() => {
            const type = this.tagForm.get('type').value;
            const icon = this.tagForm.get('icon').value;
            const iconLeft = this.tagForm.get('iconLeft').value;
            const iconRight = this.tagForm.get('iconRight').value;
            const iconRightClickable = this.tagForm.get('iconRightAction').value;
            const tagConfig: SdsTagConfig = {
               text: this.tagForm.get('message').value,
               size: this.tagForm.get('size').value,
               tagType: type,
               style: this.tagForm.get('style').value
            };

            if (icon) {
               if (iconLeft) {
                  tagConfig.iconLeft = this.tagForm.get('iconLeftExamples').value;
               }

               if (iconRight) {
                  tagConfig.iconRight = this.tagForm.get('iconRightExamples').value;

                  if (iconRightClickable) {
                     tagConfig.iconRightClickable = this.tagForm.get('iconRightAction').value;
                  }
               }
            }

            if (type === SdsTagType.INTERACTIVE) {
               tagConfig.interactiveMode = this.tagForm.get('interactiveMode').value;
            }

            this.tagConfig = tagConfig;
         });

      this.tagForm.get('icon').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            if (!val) {
               this.tagForm.get('iconLeft').setValue(true);
               this.tagForm.get('iconRight').setValue(false);
               this.tagForm.get('iconLeftExamples').setValue('icon-cog');
               this.tagForm.get('iconRightExamples').setValue('icon-cross');

               this.tagConfig = {
                  ...this.tagConfig,
                  iconRight: ''
               };
            } else {
               this.tagForm.get('iconLeft').setValue(true);
            }
         });

      this.tagForm.get('iconLeft').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            this.tagForm.get('iconLeftExamples').setValue('icon-cog');
            this.tagConfig = {...this.tagConfig, iconLeft: val ? 'icon-cog' : ''};
         });

      this.tagForm.get('type').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            if (val === 'interactive') {
               this.tagForm.get('interactiveMode').setValue('trigger');
            }
         });

      this.tagForm.get('iconRight').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            this.tagForm.get('iconRightExamples').setValue('icon-cross');
            this.tagConfig = {...this.tagConfig, iconRight: val ? 'icon-cross' : ''};
         });

      this.tagForm.get('iconLeftExamples').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            if (val) {
               this.tagConfig = {...this.tagConfig, iconLeft: this.tagForm.get('iconLeftExamples').value};
            }
         });

      this.tagForm.get('iconRightExamples').valueChanges
         .pipe(takeUntil(this.componentDestroyed$))
         .subscribe((val) => {
            if (val) {
               this.tagConfig = {...this.tagConfig, iconRight: this.tagForm.get('iconRightExamples').value};
            }
         });
   }

   public displayMessage(message: string): void {
      this.message = message;
      this.showMessage = true;

      this.messageTimeout = setTimeout(() => {
         this.showMessage = false;
         this.cd.detectChanges();
      }, 2000);
   }
}
