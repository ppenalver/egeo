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
/**************************** MAIN MODULES *********************************************/
import { StFormSchema } from './st-form/st-form.model';

export { EgeoModule } from './egeo.module';

/**************************** UTILS AND OTHERS *****************************************/
export {
   StEgeo,
   StRequired,
   StDeprecated
} from './decorators/require-decorators';
export {
   TranslateableElement,
   EgeoResolverKeys,
   TranslateServiceType
} from './utils/egeo-resolver/egeo-resolve-model';
export { EgeoResolveService } from './utils/egeo-resolver/egeo-resolve.service';
export { EgeoUtils } from './utils/egeo-utils';
export { EventWindowManager } from './utils/event-window-manager';
export { StRegEx } from './utils/st-regex';
export {
   SelectOneDispaptcherListener,
   SelectOneDispatcher
} from './utils/unique-dispatcher';

/**************************** PIPES ***************************************************/
export { PipesModule } from './pipes/pipes.module';
export { StFilterList } from './pipes/search-filter/search-filter.pipe';
export { StObjectToArrayPipe } from './pipes/st-object-to-array/st-object-to-array.pipe';

/**************************** DIRECTIVES ***************************************************/
export { StInputAdjustable } from './directives/st-input-adjustable/st-input-adjustable';
export { StInputAdjustableModule } from './directives/st-input-adjustable/st-input-adjustable.module';
export { StMinValidator } from './directives/form/st-min-validator/st-min-validator';
export { StMaxValidator } from './directives/form/st-max-validator/st-max-validator';
export { StFormDirectiveModule } from './directives/form/form-directives.module';
export { StClickOutside } from './directives/st-click-outside/st-click-outside.directive';
export { StClickOutsideModule } from './directives/st-click-outside/st-click-outside.module';

/**************************** MODULES *************************************************/
// Alerts
export { SdsAlertModule } from './sds-alert/sds-alert.module';
export { SdsAlertComponent } from './sds-alert/sds-alert.component';
export { SdsAlertService } from './sds-alert/sds-alert.service';

// Breadcrumb
export {
   StBreadCrumbItem,
   StBreadCrumbMode
} from './st-breadcrumbs/st-breadcrumbs.interface';
export { StBreadcrumbsModule } from './st-breadcrumbs/st-breadcrumbs.module';
export { StBreadCrumbsComponent } from './st-breadcrumbs/st-breadcrumbs.component';
export { StBreadcrumbItemComponent } from './st-breadcrumbs/st-breadcrumbs-item/st-breadcrumbs-item.component';

// Checkbox
export { SdsCheckboxModule } from './sds-checkbox/sds-checkbox.module';
export { SdsCheckboxComponent } from './sds-checkbox/sds-checkbox.component';

// Docs
export { StDocsModule } from './st-docs/st-docs.module';
export { StDocsComponent } from './st-docs/st-docs.component';

// Dropdown menu
export {
   StDropDownMenuGroup,
   StDropDownMenuGroupSchema,
   StDropDownMenuItem,
   StDropDownVisualMode,
   StDropDownMenuItemSchema
} from './st-dropdown-menu/st-dropdown-menu.interface';
export { StDropdownMenuModule } from './st-dropdown-menu/st-dropdown-menu.module';
export { StDropdownMenuComponent } from './st-dropdown-menu/st-dropdown-menu.component';

// Filter selector
export { StFilterSelectorModule } from './st-filter-selector/st-filter-selector.module';
export { StFilterSelectorComponent } from './st-filter-selector/st-filter-selector.component';

// File button
export { StFileButtonModule } from './st-file-button/st-file-button.module';
export { StFileButtonComponent } from './st-file-button/st-file-button.component';

// Foreground notifications

export { SdsNotificationModule } from './sds-notification/sds-notification.module';
export { SdsNotificationComponent } from './sds-notification/sds-notification.component';

// Header
export {
   StHeaderMenuOption,
   StHeaderSubMenuOption,
   StHeaderMenuOptionSchema,
   StHeaderSubMenuOptionSchema
} from './st-header/st-header.model';
export { StHeaderModule } from './st-header/st-header.module';
export { StHeaderComponent } from './st-header/st-header.component';
export { StHeaderUtils } from './st-header/st-header.utils';

// Item List
export {
   StItemListModule
} from './st-item-list/st-item-list.module';
export {
   StItemListComponent
} from './st-item-list/st-item-list.component';
export {
   StItemListElement,
   StItemListConfig,
   StItemListConfigSchema
} from './st-item-list/st-item-list.model';


// Dynamic form
export { StFormModule } from './st-form/st-form.module';
export { StFormComponent } from './st-form/st-form.component';
export { StFormFieldComponent } from './st-form/st-form-field/st-form-field.component';
export { StFormFieldModule } from './st-form/st-form-field/st-form-field.module';
export { StFormSchema } from './st-form/st-form.model';
export { StFormListModule } from './st-form-list/st-form-list.module';
export { StFormListComponent } from './st-form-list/st-form-list.component';

// Fullscreen layout
export { StFullscreenLayoutModule } from './st-fullscreen-layout/st-fullscreen-layout.module';
export { StFullscreenLayoutComponent } from './st-fullscreen-layout/st-fullscreen-layout';

// Horizontal Tabs
export { SdsTabModule } from './sds-tab/sds-tab.module';
export { SdsTabComponent } from './sds-tab/sds-tab.component';
export {
   SdsTab,
   SdsTabSchema
} from './sds-tab/sds-tab.model';

// Info box
export { StInfoBoxModule } from './st-info-box/st-info-box.module';
export { StInfoBoxComponent } from './st-info-box/st-info-box.component';

// Input
export { SdsInputModule } from './sds-input/sds-input.module';
export { SdsInputComponent } from './sds-input/sds-input.component';
export {
   SdsInputError,
   SdsInputErrorSchema
} from './sds-input/sds-input.model';

// Menu
export { StMenuModule } from './st-menu/st-menu.module';
export { StMenuComponent } from './st-menu/st-menu.component';
export {
   StMenuModel,
   StMenuStatus
} from './st-menu/st-menu.model';

// Modal
export {
   StModalButton,
   StModalConfig,
   StModalResponse,
   StModalBasicType
} from './st-modal/st-modal.model';
export { StModalService } from './st-modal/st-modal.service';
export { StModalModule } from './st-modal/st-modal.module';
export { StModalComponent } from './st-modal/st-modal.component';

// Modal2
export { SdsModalComponent } from './sds-modal/sds-modal.component';
export { SdsModalModule } from './sds-modal/sds-modal.module';

// Pagination
export {
   Paginate,
   PaginateOptions,
   PaginateTexts,
   PaginateTextsSchema,
   PaginateIconClasses
} from './st-pagination/st-pagination.interface';
export { StPaginationPipe } from './st-pagination/st-pagination.pipe';
export { StPaginationService } from './st-pagination/st-pagination.service';
export { StPaginationModule } from './st-pagination/st-pagination.module';
export { StPaginationComponent } from './st-pagination/st-pagination.component';

// Pop Over
export { StPopOverModule } from './st-pop-over/st-pop-over.module';
export { StPopOverComponent } from './st-pop-over/st-pop-over.component';

// Prism
export {
   StPrismModule
} from './st-docs/st-prism/st-prism.module';
export { StPrismComponent } from './st-docs/st-prism/st-prism.component';

// Progress bar

export { StProgressBarModule } from './st-progress-bar/st-progress-bar.module';
export { StProgressBarComponent } from './st-progress-bar/st-progress-bar';


// Radio
export { SdsRadioModule } from './sds-radio/sds-radio.module';
export { SdsRadioComponent, SdsRadioGroupComponent } from './sds-radio/sds-radio.component';
export { RadioChange } from './sds-radio/sds-radio.change';

// Radio menu
export { StRadioMenuModule } from './st-radio-menu/st-radio-menu.module';
export { StRadioMenuComponent } from './st-radio-menu/st-radio-menu.component';
export {
   StRadioMenuOption,
   StRadioMenuOptionSchema
} from './st-radio-menu/st-radio-menu-option.interface';

// Search
export { StSearchModule } from './st-search/st-search.module';
export { StSearchComponent } from './st-search/st-search.component';
export {
   StSearchEvent,
   StSearchEventOrigin
} from './st-search/st-search.model';

// Select
export { StSelectModule } from './st-select/st-select.module';
export { StSelectComponent } from './st-select/st-select';
export { StCheckValidationsDirective } from './st-select/st-check-validations';

// Spinner
export { SdsSpinnerModule } from './sds-spinner/sds-spinner.module';
export { SdsSpinnerComponent } from './sds-spinner/sds-spinner.component';

// Switch
export { SdsSwitchModule } from './sds-switch/sds-switch.module';
export { SdsSwitchComponent } from './sds-switch/sds-switch.component';
export { SdsSwitchPosition } from './sds-switch/sds-switch.model';

// TAG
export { SdsTagModule } from './sds-tag/sds-tag.module';
export { SdsTagComponent } from './sds-tag/sds-tag.component';
export * from './sds-tag/sds-tag.model';

// Link
export { SdsLinkModule } from './sds-link/sds-link.module';
export { SdsLinkComponent } from './sds-link/sds-link.component';

// Table
export { StTableModule } from './st-table/st-table.module';
export { StTableComponent } from './st-table/st-table.component';
export { StPopoverFilterComponent } from './st-table/shared/st-popover-filter/st-popover-filter.component';
export { StTableRowComponent } from './st-table/shared/st-table-row/st-table-row.component';
export { StTableCellComponent } from './st-table/shared/st-table-cell/st-table-cell.component';
export { StTableHeader } from './st-table/shared/table-header.interface';
export { Order, ORDER_TYPE } from './st-table/shared/order';
export { StTableIconClasses, StTableFilterIconClasses } from './st-table/st-table.interface';

// Tag Input
export { StTagInputModule } from './st-tag-input/st-tag-input.module';
export { StTagInputComponent } from './st-tag-input/st-tag-input.component';

// Textarea
export {
   SdsTextareaError,
   SdsTextareaErrorSchema
} from './sds-textarea/sds-textarea.error.model';
export { SdsTextareaModule } from './sds-textarea/sds-textarea.module';
export { SdsTextareaComponent } from './sds-textarea/sds-textarea.component';

// Toogle buttons
export {
   StToggleButton,
   SdsToggleButtonchema
} from './sds-toggle-button/sds-toggle-button.interface';
export {
   SdsToggleButtonModule
} from './sds-toggle-button/sds-toggle-button.module';
export { SdsToggleButtonComponent } from './sds-toggle-button/sds-toggle-button.component';

// Tooltip
export { SdsTooltipModule } from './sds-tooltip/sds-tooltip.module';
export { SdsTooltipComponent } from './sds-tooltip/sds-tooltip.component';
export { SdsTooltipPlacement } from './sds-tooltip/sds-tooltip.interface';

// Zero page
export { StZeroPageModule } from './st-zero-page/st-zero-page.module';
export { StZeroPageComponent } from './st-zero-page/st-zero-page.component';

export { StPopModule } from './st-pop/st-pop.module';
export { StPopComponent } from './st-pop/st-pop.component';
export { StPopOffset, StPopPlacement } from './st-pop/st-pop.model';

// Utils
export { StDemoGeneratorModule } from './utils/demo-generator/demo-generator.module';
export { StDemoGenerator } from './utils/demo-generator/demo-generator';

/**************************** FULL MODULES *********************************************/
export * from './st-label/index';
