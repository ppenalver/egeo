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
import { ChangeDetectionStrategy, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StDropDownMenuItem } from '../st-dropdown-menu.interface';
import { StDropdownMenuItemComponent } from './st-dropdown-menu-item.component';
import { StBubbleModule } from '../../st-bubble/st-bubble.module';
import { StBubbleComponent } from '../..';

const item: StDropDownMenuItem = {
   label: 'example 1',
   value: 1
};

describe('StDropdownMenuItemComponent', () => {

   let comp: StDropdownMenuItemComponent;
   let fixture: ComponentFixture<StDropdownMenuItemComponent>;

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [StBubbleModule],
         declarations: [StDropdownMenuItemComponent],
         schemas: [NO_ERRORS_SCHEMA]
      })
         .overrideComponent(StBubbleComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
         })
         .compileComponents();  // compile template and css
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(StDropdownMenuItemComponent);
      comp = fixture.componentInstance;
   });

   it(`should not show anything if not have item`, () => {
      comp.item = undefined;
      fixture.detectChanges();
      expect(comp.hasItem).toBeFalsy();
      expect(comp.hasIcon).toBeFalsy();
      expect(comp.icon).toEqual('');
      expect(comp.isSelected).toBeFalsy();
      expect(comp.styleSelected).toBeTruthy();

      expect((fixture.debugElement.nativeElement as HTMLElement).children.length).toEqual(0);
      expect((fixture.debugElement.nativeElement as HTMLElement).querySelector('li')).toBeNull();
   });

   it('should show a item without icon', () => {
      comp.item = item;
      fixture.detectChanges();
      expect(comp.hasItem).toBeTruthy();
      expect(comp.hasIcon).toBeFalsy();
      expect(comp.icon).toEqual('');
      expect(comp.isSelected).toBeFalsy();
      expect(comp.styleSelected).toBeTruthy();

      expect((fixture.debugElement.nativeElement as HTMLElement).children.length).toEqual(1);
      expect((fixture.debugElement.nativeElement as HTMLElement).querySelector('li')).toBeDefined();
      expect((fixture.debugElement.nativeElement as HTMLElement).querySelector('span').innerText).toEqual(item.label);
   });

   it('should show a item without icon', () => {
      comp.item = Object.assign({}, { icon: 'icon' }, item);
      fixture.detectChanges();
      expect(comp.hasItem).toBeTruthy();
      expect(comp.hasIcon).toBeTruthy();
      expect(comp.icon).toEqual(comp.item.icon);
      expect(comp.isSelected).toBeFalsy();
      expect(comp.styleSelected).toBeTruthy();

      expect((fixture.debugElement.nativeElement as HTMLElement).children.length).toEqual(1);
      expect((fixture.debugElement.nativeElement as HTMLElement).querySelector('li')).toBeDefined();
      expect((fixture.debugElement.nativeElement as HTMLElement).querySelector('i')).toBeDefined();
      expect((fixture.debugElement.nativeElement as HTMLElement).querySelector('i').classList).toContain(comp.item.icon);
      expect((fixture.debugElement.nativeElement as HTMLElement).querySelector('span').innerText).toEqual(item.label);
   });

   it('should add selected class if element is selected', () => {
      comp.item = item;
      comp.selectedItem = item;
      fixture.detectChanges();
      expect(comp.hasItem).toBeTruthy();
      expect(comp.hasIcon).toBeFalsy();
      expect(comp.icon).toEqual('');
      expect(comp.isSelected).toBeTruthy();
      expect(comp.styleSelected).toBeTruthy();

      expect((fixture.debugElement.nativeElement as HTMLElement).children.length).toEqual(1);
      expect((fixture.debugElement.nativeElement as HTMLElement).querySelector('li')).toBeDefined();
      expect((fixture.debugElement.nativeElement as HTMLElement).querySelector('li').classList).toContain('selected');
      expect((fixture.debugElement.nativeElement as HTMLElement).querySelector('span').innerText).toEqual(item.label);
   });

   it('should add selected class if element is selected by property', () => {
      comp.item = Object.assign({}, { selected: true }, item);
      fixture.detectChanges();
      expect(comp.hasItem).toBeTruthy();
      expect(comp.hasIcon).toBeFalsy();
      expect(comp.icon).toEqual('');
      expect(comp.isSelected).toBeTruthy();
      expect(comp.styleSelected).toBeTruthy();

      expect((fixture.debugElement.nativeElement as HTMLElement).children.length).toEqual(1);
      expect((fixture.debugElement.nativeElement as HTMLElement).querySelector('li')).toBeDefined();
      expect((fixture.debugElement.nativeElement as HTMLElement).querySelector('li').classList).toContain('selected');
      expect((fixture.debugElement.nativeElement as HTMLElement).querySelector('span').innerText).toEqual(item.label);
   });

   it('should not add selected class if element is selected and styleSelected is false', () => {
      comp.item = item;
      comp.selectedItem = item;
      comp.styleSelected = false;
      fixture.detectChanges();
      expect(comp.hasItem).toBeTruthy();
      expect(comp.hasIcon).toBeFalsy();
      expect(comp.icon).toEqual('');
      expect(comp.isSelected).toBeFalsy();
      expect(comp.styleSelected).toBeFalsy();

      const li: DebugElement = fixture.debugElement.query(By.css('li'));
      const span: DebugElement = fixture.debugElement.query(By.css('span'));

      expect((fixture.debugElement.nativeElement as HTMLElement).children.length).toEqual(1);
      expect(li).toBeDefined();
      expect(li.nativeElement).toBeDefined();
      expect(li.nativeElement.classList).not.toContain('selected');
      expect(span.nativeElement).toBeDefined();
      expect(span.nativeElement.innerText).toEqual(item.label);
   });

   it('should not add selected class if element is selected by property and styleSelected is false', () => {
      comp.item = Object.assign({}, { selected: true }, item);
      comp.styleSelected = false;
      fixture.detectChanges();
      expect(comp.hasItem).toBeTruthy();
      expect(comp.hasIcon).toBeFalsy();
      expect(comp.icon).toEqual('');
      expect(comp.isSelected).toBeFalsy();
      expect(comp.styleSelected).toBeFalsy();

      const li: DebugElement = fixture.debugElement.query(By.css('li'));
      const span: DebugElement = fixture.debugElement.query(By.css('span'));

      expect((fixture.debugElement.nativeElement as HTMLElement).children.length).toEqual(1);
      expect(li).toBeDefined();
      expect(li.nativeElement).toBeDefined();
      expect(li.nativeElement.classList).not.toContain('selected');
      expect(span).toBeDefined();
      expect(span.nativeElement).toBeDefined();
      expect(span.nativeElement.innerText).toEqual(item.label);
   });

   it('label and icon should be displayed with the color specified on the model', () => {
      comp.item = Object.assign({}, { icon: 'logout-button', iconColor: 'rgb(103, 56, 82)', labelColor: 'rgb(34, 73, 26)' }, item);
      fixture.detectChanges();

      const icon: DebugElement = fixture.debugElement.query(By.css('li i.icon'));
      const label: DebugElement = fixture.debugElement.query(By.css('li .label > span'));

      expect(icon.styles.color).toEqual('rgb(103, 56, 82)');
      expect(label.styles.color).toEqual('rgb(34, 73, 26)');
   });

   it('text info should be displayed below the label only if it is provided on the model', () => {
      const fakeTextInfo = 'This is an optional text';
      comp.item = Object.assign({}, { label: 'This is my label', textInfo: fakeTextInfo }, item);
      fixture.detectChanges();

      let textInfo: HTMLSpanElement = fixture.nativeElement.querySelector('.text-info');

      expect(textInfo).not.toBeNull();
      expect(textInfo.innerText).toContain(fakeTextInfo);

      comp.item = Object.assign({}, { label: 'This is my label' }, item);
      fixture.detectChanges();

      textInfo = fixture.nativeElement.querySelector('.text-info');

      expect(textInfo).toBeNull();
   });

   it('should emit on change', () => {
      spyOn(comp.change, 'emit');
      comp.item = item;
      fixture.detectChanges();

      comp.onChangeItem();
      expect(comp.change.emit).toHaveBeenCalled();
      expect(comp.change.emit).toHaveBeenCalledWith(comp.item);
   });

   it('should emit on click', () => {
      spyOn(comp.change, 'emit');
      comp.item = item;
      fixture.detectChanges();

      let li: DebugElement = fixture.debugElement.query(By.css('li'));
      expect(li).toBeDefined();
      expect(li.nativeElement).toBeDefined();

      (li.nativeElement as HTMLLIElement).click();
      expect(comp.change.emit).toHaveBeenCalled();
      expect(comp.change.emit).toHaveBeenCalledWith(comp.item);
   });

   it('should emit on press enter', () => {
      spyOn(comp.change, 'emit');
      comp.item = item;
      fixture.detectChanges();

      let li: DebugElement = fixture.debugElement.query(By.css('li'));
      expect(li).toBeDefined();
      expect(li.nativeElement).toBeDefined();

      li.triggerEventHandler('keyup.enter', {});
      fixture.detectChanges();
      expect(comp.change.emit).toHaveBeenCalled();
      expect(comp.change.emit).toHaveBeenCalledWith(comp.item);
   });

   it('should be able to render safe html if it has html in its label', () => {
      comp.item = {
         label: '<b>A</b> M<b>a</b>n <b>a</b>nd <b>a</b> Wom<b>a</b>n',
         value: 'fake value',
         hasHtml: true
      };
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.st-dropdown-menu-item > div').innerText).toEqual('A Man and a Woman');
      expect(fixture.nativeElement.querySelector('.st-dropdown-menu-item > div').innerHTML).toEqual(comp.item.label);
   });

   describe('should be able to display an extra button if it is introduced', () => {
      it('icon is displayed with the color introduced', () => {
         comp.item = {
            label: '<b>A</b> M<b>a</b>n <b>a</b>nd <b>a</b> Wom<b>a</b>n',
            hasHtml: false,
            value: 'info',
            extraIconColor: 'rgb(45, 78, 92)',
            extraIcon: 'icon-info'
         };
         fixture.detectChanges();

         expect(fixture.nativeElement.querySelector('.st-dropdown-menu-item i.extra-icon').classList).toContain('icon-info');
         expect(fixture.debugElement.query(By.css('.st-dropdown-menu-item i.extra-icon')).styles.color).toEqual('rgb(45, 78, 92)');
      });

      describe('If bubble for extra icon is introduced', () => {
         beforeEach(() => {
            comp.item = {
               label: '<b>A</b> M<b>a</b>n <b>a</b>nd <b>a</b> Wom<b>a</b>n',
               hasHtml: false,
               value: 'info',
               extraIconColor: '#fefefe',
               extraIcon: 'icon-info',
               extraIconBubble: 'This is an informative text'
            };
            fixture.detectChanges();
         });

         it('it is only displayed when user puts mouse over the icon', (done) => {
            expect(fixture.nativeElement.querySelector('.st-dropdown-menu-item .extra-icon__bubble i').classList).toContain('icon-info');

            fixture.nativeElement.querySelector('.st-dropdown-menu-item .extra-icon__bubble i').dispatchEvent(new Event('mouseenter'));
            fixture.detectChanges();

            fixture.whenStable().then(() => {
               fixture.detectChanges();
               expect(fixture.nativeElement.querySelector('.st-dropdown-menu-item st-bubble .content').style.visibility).toEqual('visible');

               fixture.nativeElement.querySelector('.st-dropdown-menu-item .extra-icon__bubble i').dispatchEvent(new Event('mouseleave'));
               fixture.detectChanges();

               fixture.whenStable().then(() => {
                  fixture.detectChanges();

                  expect(fixture.nativeElement.querySelector('.st-dropdown-menu-item st-bubble .content').style.visibility).toEqual('hidden');
                  done();
               });

            });
         });
      });
   });
});
