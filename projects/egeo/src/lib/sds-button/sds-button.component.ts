import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {SdsButtonConfig, SdsButtonIconType, SdsButtonSize, SdsButtonType} from './sds-button.model';

@Component({
   selector: 'sds-button',
   templateUrl: 'sds-button.component.html',
   styleUrls: ['sds-button.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class SdsButtonComponent {
   @Input() config: SdsButtonConfig;
   @Input() isDisabled: boolean;
   @Output() buttonClick: EventEmitter<void>;

   public sdsButtonIconType: typeof SdsButtonIconType;
   public sdsButtonSize: typeof SdsButtonSize;
   public sdsButtonType: typeof SdsButtonType;

   constructor() {
      this.config = {};
      this.sdsButtonIconType = SdsButtonIconType;
      this.sdsButtonSize = SdsButtonSize;
      this.sdsButtonType = SdsButtonType;
      this.buttonClick = new EventEmitter<void>();
   }

}
