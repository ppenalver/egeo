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
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SdsTooltipPlacement } from '@stratio/egeo';
import { CssProperty } from '@app/shared/css-property-table/css-property-table.model';

@Component({
   selector: 'sds-tooltip-demo',
   templateUrl: './sds-tooltip-demo.html',
   styleUrls: ['./sds-tooltip-demo.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class SdsTooltipDemoComponent {
   public configDoc: Record<string, string> = {
      html: 'demo/sds-tooltip-demo/sds-tooltip-demo.html',
      ts: 'demo/sds-tooltip-demo/sds-tooltip-demo.ts',
      component: 'lib/sds-tooltip/sds-tooltip.component.ts'
   };
   public cssProperties: CssProperty[] = [
      {
         name: '--egeo-sds-tooltip--margin',
         description: 'Distance between tooltip and text',
         default: '8px'
      },
      {
         name: '--egeo-sds-tooltip--color',
         description: 'Text color',
         default: '$neutral-full'
      },   {
         name: '--egeo-sds-tooltip--padding',
         description: 'Tooltip Padding',
         default: '6px 16px'
      },   {
         name: '--egeo-sds-tooltip__white--border-color',
         description: 'Border color in white theme',
         default: '$space-30'
      },   {
         name: '--egeo-sds-tooltip__white--color',
         description: 'Text color in white theme',
         default: '$space-70'
      },   {
         name: '--egeo-sds-tooltip__white--padding',
         description: 'Tooltip padding in white theme',
         default: '4px 10px'
      },   {
         name: '--egeo-sds-tooltip__white--bg-color',
         description: 'Background color in white theme',
         default: '$neutral-full'
      }
   ];

   public margin: number = 8;
   public text: string = 'This is a tooltip';
   public showArrow: boolean = false;
   public showOnClick: boolean = false;
   public animated: boolean = true;
   public placement: SdsTooltipPlacement = 'top';
   public whiteTheme: boolean = false;
}
