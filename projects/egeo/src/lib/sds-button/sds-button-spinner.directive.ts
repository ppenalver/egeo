import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
   selector: '[sdsButtonSpinner]'
})
export class SdsButtonSpinnerDirective {
   @Input()
   set on(on: boolean) {
      const _elementRect: ClientRect | DOMRect = this._element.getBoundingClientRect();

      if (on) {
         this._elementClassList = Array.from(this._element.classList);
         this._previousHeight = _elementRect.height;
         this._element.style.width = `${_elementRect.width}px`;
         this._element.style.height = `${_elementRect.height}px`;
         this._element.classList.remove('sds-button--icon-left', 'sds-button--icon-right');
      } else {
         this._element.style.width = 'unset';
         this._element.style.height = 'unset';
         if (!!this._elementClassList) {
            this._element.classList.add(...this._elementClassList);
         }
      }
      this._on = on;
   }
   get on(): boolean {
      return this._on;
   }

   private _element: HTMLElement;
   private _elementClassList: Array<string>;
   private _on: boolean;
   private _previousHeight: number;

   constructor(private _el: ElementRef<HTMLElement>) {
      this._element = _el.nativeElement;
   }
}
