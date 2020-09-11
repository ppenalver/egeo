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

import {Component} from '@angular/core';
import {StModal2Config, StModal2Type} from '../../../../../egeo/src/lib/st-modal2/st-modal2.model';

@Component({
  selector: 'st-modal2-demo',
  templateUrl: './st-modal2-demo.component.html',
  styleUrls: ['./st-modal2-demo.component.scss']
})

export class StModal2DemoComponent {

   public modalConfig: StModal2Config;
   public modalType: StModal2Type = StModal2Type.BASIC;
   public height: number;
   public width: number = 600;
   public closeControl: boolean = true;
   public clickOutside: boolean = true;
   public fullWindow: boolean = false;
   public enableAnimation: boolean = false;
   public showStandardActions: boolean = false;
   public showStandardHeader: boolean = false;
   public animationTime: number = 300;
   public modalTitle: string = 'Titulo de prueba';

   public showModal: boolean = false;
   public configDoc: any = {
      html: 'demo/st-modal2-demo/st-modal2-demo.component.html',
      ts: 'demo/st-modal2-demo/st-modal2-demo.component.ts',
      component: 'lib/st-modal2/st-modal2.component.ts'
   };

   public triggerModal(): void {
      this.modalConfig = {
         modalType: this.modalType,
         closeControl: this.closeControl,
         height: this.height,
         width: this.width,
         clickOutside: this.clickOutside,
         showStandardActions: this.showStandardActions,
         showStandardHeader: this.showStandardHeader,
         fullWindow: this.fullWindow,
         enableAnimation: this.enableAnimation,
         animationTime: this.animationTime,
         title: this.modalTitle
      };

      this.showModal = true;
   }

}
