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
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EGEO_DEMO_MENU, EGEO_DEMO_MENU_SDS, EGEO_DEMO_MENU_SDS_VERIFIED, SdsDemoMenu} from '@app/demos/demos.routes';

import { DemoSideMenu } from '../../../shared/menu/menu.model';
import {ActivationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
   selector: 'demo-layout',
   templateUrl: './demo-layout.html',
   styleUrls: ['./demo.layout.scss']
})
export class DemoLayoutComponent implements OnInit, OnDestroy {
   @ViewChild('mainContent', {static: true}) mainContent: ElementRef;

   public menu: SdsDemoMenu[] = EGEO_DEMO_MENU || [];
   public title: string;
   private componentDestroyed$: Subject<void>;

   constructor(private _router: Router) {
      this.componentDestroyed$ = new Subject<void>();
   }

   public ngOnInit(): void {
      this._router.events
         .pipe(
            filter(e => e instanceof ActivationEnd),
            takeUntil(this.componentDestroyed$)
         )
         .subscribe(() => {
            if (this.mainContent) {
               this.mainContent.nativeElement.scrollTo(0, 0);
            }
         });
   }

   public ngOnDestroy(): void {
      this.componentDestroyed$.next();
      this.componentDestroyed$.complete();
      this.componentDestroyed$.unsubscribe();
   }

   public get demoMenuSds(): DemoSideMenu[] {
      return EGEO_DEMO_MENU_SDS
         .sort((a, b) => a.name > b.name ? 1 : -1)
         .map(_ => ({ label: _.name, url: `/components/demo/${_.path}` }));
   }

   public get demoMenuSdsVerified(): DemoSideMenu[] {
      return EGEO_DEMO_MENU_SDS_VERIFIED
         .sort((a, b) => a.name > b.name ? 1 : -1)
         .map(_ => ({ label: _.name, url: `/components/demo/${_.path}` }));
   }

   public get demoMenu(): DemoSideMenu[] {
      return EGEO_DEMO_MENU
         .sort((a, b) => a.name > b.name ? 1 : -1)
         .map(_ => ({ label: _.name, url: `/components/demo/${_.path}` }));
   }

   public updateDemoTitle(demo: DemoSideMenu): void {
      const demoTitle = EGEO_DEMO_MENU.concat(EGEO_DEMO_MENU_SDS).concat(EGEO_DEMO_MENU_SDS_VERIFIED).find((d) => d.name === demo.label);
      this.title = demoTitle ? demoTitle.name : '';
   }
}
