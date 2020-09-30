/*
 * © 2017 Stratio Big Data Inc., Sucursal en España. All rights reserved.
 *
 * This software – including all its source code – contains proprietary
 * information of Stratio Big Data Inc., Sucursal en España and
 * may not be revealed, sold, transferred, modified, distributed or
 * otherwise made available, licensed or sublicensed to third parties;
 * nor reverse engineered, disassembled or decompiled, without express
 * written authorization from Stratio Big Data Inc., Sucursal en España.
 */

import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SdsTooltipComponent } from './sds-tooltip.component';

const id: string = 'tooltipId';
const originalContent: string = 'This is the original element content';
const tooltipText: string = 'This text will be displayed in our tooltip';

@Component({
   template: '<span id="' + id + '" sds-tooltip [attr.title]="tooltipText" [showOnClick]="showOnClick">' + originalContent + '</span>'
})
class TestSdsTooltipComponent {
   @Input() showOnClick: boolean = false;
   @Input() tooltipText: string = tooltipText;
}

let component: TestSdsTooltipComponent;
let element: DebugElement;
let fixture: ComponentFixture<TestSdsTooltipComponent>;

describe('SdsTooltip', () => {

   beforeEach(() => {
      TestBed
      .configureTestingModule({
         declarations: [
            SdsTooltipComponent,
            TestSdsTooltipComponent
         ]
      })
      .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(TestSdsTooltipComponent);
      component = fixture.componentInstance;
      element = fixture.debugElement.query(By.css('#' + id));
      fixture.detectChanges();
   });


   it('It has to display content inside a span without a title', () => {
      let span: Element = element.query(By.css('span')).nativeElement;
      expect(span.getAttribute('title')).toBe('');
      expect(span.innerHTML).toContain(originalContent);
   });

   it('If showOnClick, sds-tooltip--on and sds-tooltip--off classes are added or removed on click', () => {
      component.showOnClick = true;
      fixture.detectChanges();
      expect(element.nativeElement.className).toContain('sds-tooltip--off');
      expect(element.nativeElement.className).not.toContain('sds-tooltip--on');

      element.nativeElement.click();
      fixture.detectChanges();
      expect(element.nativeElement.className).toContain('sds-tooltip--on');
      expect(element.nativeElement.className).not.toContain('sds-tooltip--off');
   });

});
