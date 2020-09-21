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
import { PipesModule } from './pipes/pipes.module';
import { SdsAlertModule } from './sds-alert/sds-alert.module';
import { StBubbleModule } from './st-bubble/st-bubble.module';
import { StBreadcrumbsModule } from './st-breadcrumbs/st-breadcrumbs.module';
import { SdsCheckboxModule } from './sds-checkbox/sds-checkbox.module';
import { StDocsModule } from './st-docs/st-docs.module';
import { StDropdownMenuModule } from './st-dropdown-menu/st-dropdown-menu.module';
import { StFileButtonModule } from './st-file-button/st-file-button.module';
import { StFormDirectiveModule } from './directives/form/form-directives.module';
import { StFormModule } from './st-form/st-form.module';
import { StFormListModule } from './st-form-list/st-form-list.module';
import { StFullscreenLayoutModule } from './st-fullscreen-layout/st-fullscreen-layout.module';
import { StHeaderModule } from './st-header/st-header.module';
import { SdsTabModule } from './sds-tab/sds-tab.module';
import { StInfoBoxModule } from './st-info-box/st-info-box.module';
import { StInputModule } from './st-input/st-input.module';
import { StItemListModule } from './st-item-list/st-item-list.module';
import { StLabelModule } from './st-label/index';
import { StModalModule } from './st-modal/st-modal.module';
import { SdsModalModule } from './sds-modal/sds-modal.module';
import { StPaginationModule } from './st-pagination/st-pagination.module';
import { StPopModule } from './st-pop/st-pop.module';
import { StPopOverModule } from './st-pop-over/st-pop-over.module';
import { StPrismModule } from './st-docs/st-prism/st-prism.module';
import { StProgressBarModule } from './st-progress-bar/st-progress-bar.module';
import { StRadioMenuModule } from './st-radio-menu/st-radio-menu.module';
import { SdsRadioModule } from './sds-radio/sds-radio.module';
import { StSearchModule } from './st-search/st-search.module';
import { StSelectModule } from './st-select/st-select.module';
import { StSidebarModule } from './st-sidebar/st-sidebar.module';
import { SdsSpinnerModule } from './sds-spinner/sds-spinner.module';
import { SdsSwitchModule } from './sds-switch/sds-switch.module';
import { StTableModule } from './st-table/st-table.module';
import { StTagInputModule } from './st-tag-input/st-tag-input.module';
import { SdsTextareaModule } from './sds-textarea/sds-textarea.module';
import { SdsToggleButtonModule } from './sds-toggle-button/sds-toggle-button.module';
import { StTooltipModule } from './st-tooltip/st-tooltip.module';
import { StVerticalTabsModule } from './st-vertical-tabs/st-vertical-tabs.module';
import { StFormFieldModule } from './st-form/st-form-field/st-form-field.module';
import { SdsNotificationModule } from './sds-notification/sds-notification.module';
import { StZeroPageModule } from './st-zero-page/st-zero-page.module';
import { SdsTagModule } from './sds-tag/sds-tag.module';

export const DECLARATIONS: any[] = [
   PipesModule,
   SdsAlertModule,
   StBreadcrumbsModule,
   StBubbleModule,
   SdsCheckboxModule,
   StDocsModule,
   StDropdownMenuModule,
   StFileButtonModule,
   SdsNotificationModule,
   StFormDirectiveModule,
   StFormModule,
   StFormFieldModule,
   StFormListModule,
   StFullscreenLayoutModule,
   StHeaderModule,
   SdsTabModule,
   StInfoBoxModule,
   StInputModule,
   StItemListModule,
   StLabelModule,
   StModalModule,
   SdsModalModule,
   StPaginationModule,
   StPopModule,
   StPrismModule,
   StProgressBarModule,
   StPopOverModule,
   StRadioMenuModule,
   SdsRadioModule,
   StSearchModule,
   StSelectModule,
   StSidebarModule,
   SdsSpinnerModule,
   SdsSwitchModule,
   StTableModule,
   StTagInputModule,
   SdsTextareaModule,
   SdsToggleButtonModule,
   StTooltipModule,
   StVerticalTabsModule,
   StZeroPageModule,
   SdsTagModule
];
