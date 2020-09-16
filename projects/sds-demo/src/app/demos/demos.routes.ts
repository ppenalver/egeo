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
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export class SdsDemoMenu {
   id: string;
   name: string;
   path: string;
   moduleLazyLoad: string;
}

export const EGEO_DEMO_MENU_SDS_VERIFIED: SdsDemoMenu[] = [
   { id: 'sds-checkbox', name: 'Checkbox', path: 'checkbox-demo', moduleLazyLoad: 'SdsCheckboxDemoModule' },
   { id: 'sds-radio', name: 'Radio Button', path: 'radio-demo', moduleLazyLoad: 'SdsRadioDemoModule' },
   { id: 'sds-switch', name: 'Switch', path: 'switch-demo', moduleLazyLoad: 'SdsSwitchDemoModule' },
   { id: 'sds-toggle-button', name: 'Toggle Button', path: 'toggle-buttons-demo', moduleLazyLoad: 'SdsToggleButtonDemoModule' },
   { id: 'sds-spinner', name: 'Spinner', path: 'spinner-demo', moduleLazyLoad: 'SdsSpinnerDemoModule' },
   { id: 'sds-modal', name: 'Modal', path: 'modal2-demo', moduleLazyLoad: 'SdsModalDemoModule' },
   { id: 'sds-textarea', name: 'Textarea', path: 'textarea', moduleLazyLoad: 'SdsTextareaDemoModule' },
   { id: 'sds-notification', name: 'Notification',
      path: 'notification-demo', moduleLazyLoad: '@SdsNotificationModule' }
];


export const EGEO_DEMO_MENU_SDS: SdsDemoMenu[] = [
   { id: 'st-input', name: 'Input', path: 'input', moduleLazyLoad: 'StInputDemoModule' },
   { id: 'st-button', name: 'Button', path: 'button-demo', moduleLazyLoad: 'StButtonDemoModule' },
   { id: 'st-select', name: 'Select', path: 'select-demo', moduleLazyLoad: 'StSelectDemoModule' },
   { id: 'st-horizontal-tabs', name: 'Tab', path: 'horizontal-tabs-demo', moduleLazyLoad: 'StHorizontalTabsModule' },
   { id: 'st-dropdown-menu', name: 'Dropdown Menu', path: 'dropdown-menu-demo', moduleLazyLoad: 'StDropdownMenuDemoModule' },
   { id: 'st-tag', name: 'Tag', path: 'tag-demo', moduleLazyLoad: 'StTagDemoModule' },
   { id: 'st-pagination', name: 'Pagination', path: 'pagination-demo', moduleLazyLoad: 'StPaginationDemoModule' },
   { id: 'st-tooltip', name: 'Tooltip', path: 'tooltip-demo', moduleLazyLoad: 'StTooltipDemoModule' },
   { id: 'st-breadcrumbs', name: 'Breadcrumb', path: 'breadcrumbs', moduleLazyLoad: 'StBreadcrumbsDemoModule' },
   { id: 'st-alerts', name: 'Alert', path: 'alerts-demo', moduleLazyLoad: 'StAlertsDemoModule' },
   { id: 'st-table', name: 'Table', path: 'table-demo', moduleLazyLoad: 'StTableDemoModule' },
   { id: 'st-tag-input', name: 'Tag Input', path: 'tag-input-demo', moduleLazyLoad: 'StTagInputDemoModule' }
];

export const EGEO_DEMO_MENU: SdsDemoMenu[] = [
   { id: 'st-vertical-tabs', name: 'Vertical Tab', path: 'vertical-tabs-demo', moduleLazyLoad: 'StVerticalTabsDemoModule' },
   { id: 'st-bubble', name: 'Bubble', path: 'bubble-demo', moduleLazyLoad: 'StBubbleDemoModule' },
   { id: 'st-bubble-on-ellipsis', name: 'Bubble on Ellipsis', path: 'bubble-on-ellipsis-demo', moduleLazyLoad: 'StBubbleOnEllipsisDemoModule' },
   { id: 'st-dynamic-table', name: 'Dynamic Table', path: 'dynamic-table-demo', moduleLazyLoad: 'StDynamicTableDemoModule' },
   { id: 'st-file-button', name: 'File Button', path: 'file-button-demo', moduleLazyLoad: 'StFileButtonDemoModule' },
   { id: 'st-filter-selector', name: 'Filter Selector', path: 'filter-selector-demo', moduleLazyLoad: 'StFilterSelectorDemoModule' },
   { id: 'st-form', name: 'Form', path: 'form-demo', moduleLazyLoad: 'StFormDemoModule' },
   { id: 'st-form-list', name: 'Form List', path: 'form-list-demo', moduleLazyLoad: 'StFormListDemoModule' },
   { id: 'st-fullscreen-layout', name: 'Fullscreen Layout', path: 'fullscreen-layout-demo', moduleLazyLoad: 'StFullscreenLayoutDemoModule' },
   { id: 'st-header', name: 'Header', path: 'header-demo', moduleLazyLoad: 'StHeaderDemoModule' },
   { id: 'st-label', name: 'Label', path: 'label-demo', moduleLazyLoad: 'StLabelDemoModule' },
   { id: 'st-menu', name: 'Menu', path: 'menu-demo', moduleLazyLoad: 'StMenuDemoModule'},
   { id: 'st-pop-over', name: 'Pop Over', path: 'pop-over-demo', moduleLazyLoad: 'StPopOverDemoModule' },
   { id: 'st-progress-bar', name: 'Progress Bar', path: 'progress-bar-demo', moduleLazyLoad: 'StProgressBarDemoModule' },
   { id: 'sds-radio-menu', name: 'Radio Menu', path: 'radio-menu-demo', moduleLazyLoad: 'StRadioMenuDemoModule' },
   { id: 'st-search', name: 'Search', path: 'search-demo', moduleLazyLoad: 'StSearchDemoModule' },
   { id: 'st-sidebar', name: 'Sidebar', path: 'sidebar-demo', moduleLazyLoad: 'SidebarDemoModule' },
   { id: 'st-zero-page', name: 'Zero Page', path: 'zero-page-demo', moduleLazyLoad: 'StZeroPageDemoModule' }
];

// tslint:disable:max-line-length
const routes: Routes = [
   { path: 'alerts-demo', loadChildren: () => import( './st-alert-demo/st-alerts-demo.module').then(m => m.StAlertsDemoModule) },
   { path: 'breadcrumbs', loadChildren: () => import( './st-breadcrumbs-demo/st-breadcrumbs-demo.module').then(m => m.StBreadcrumbsDemoModule ) },
   { path: 'bubble-demo', loadChildren: () => import( './st-bubble-demo/st-bubble-demo.module').then(m => m.StBubbleDemoModule ) },
   { path: 'bubble-on-ellipsis-demo', loadChildren: () => import( './st-bubble-on-ellipsis-demo/st-bubble-on-ellipsis-demo.module').then(m => m.StBubbleOnEllipsisDemoModule ) },
   { path: 'button-demo', loadChildren: () => import( './st-button-demo/st-button-demo.module').then(m => m.StButtonDemoModule ) },
   { path: 'checkbox-demo', loadChildren: () => import( './sds-checkbox-demo/sds-checkbox-demo.module').then(m => m.SdsCheckboxDemoModule ) },
   { path: 'dropdown-menu-demo', loadChildren: () => import( './st-dropdown-menu-demo/st-dropdown-menu-demo.module').then(m => m.StDropdownMenuDemoModule ) },
   { path: 'dynamic-table-demo', loadChildren: () => import( './st-dynamic-table-demo/st-dynamic-table-demo.module').then(m => m.StDynamicTableDemoModule ) },
   { path: 'file-button-demo', loadChildren: () => import( './st-file-button-demo/st-file-button-demo.module').then(m => m.StFileButtonDemoModule ) },
   { path: 'filter-selector-demo', loadChildren: () => import( './st-filter-selector-demo/st-filter-selector-demo.module').then(m => m.StFilterSelectorDemoModule ) },
   { path: 'notification-demo', loadChildren: () => import( './sds-notification-demo/sds-notification-demo.module').then(m => m.SdsNotificationDemoModule ) },
   { path: 'form-demo', loadChildren: () => import( './st-form-demo/st-form-demo.module').then(m => m.StFormDemoModule ) },
   { path: 'form-list-demo', loadChildren: () => import( './st-form-list-demo/st-form-list-demo.module').then(m => m.StFormListDemoModule ) },
   { path: 'fullscreen-layout-demo', loadChildren: () => import( './st-fullscreen-layout-demo/st-fullscreen-layout-demo.module').then(m => m.StFullscreenLayoutDemoModule ) },
   { path: 'header-demo', loadChildren: () => import( './st-header-demo/st-header-demo.module').then(m => m.StHeaderDemoModule ) },
   { path: 'horizontal-tabs-demo', loadChildren: () => import( './st-horizontal-tabs-demo/st-horizontal-tabs-demo.module').then(m => m.StHorizontalTabsDemoModule ) },
   { path: 'info-box-demo', loadChildren: () => import( './st-info-box-demo/st-info-box-demo.module').then(m => m.StInfoBoxDemoModule ) },
   { path: 'input', loadChildren: () => import( './st-input-demo/st-input-demo.module').then(m => m.StInputDemoModule ) },
   { path: 'label-demo', loadChildren: () => import( './st-label-demo/st-label-demo.module').then(m => m.StLabelDemoModule ) },
   { path: 'menu-demo', loadChildren: () => import( './st-menu-demo/st-menu-demo.module').then(m => m.StMenuDemoModule ) },
   { path: 'modal-demo', loadChildren: () => import( './st-modal-demo/st-modal-demo.module').then(m => m.StModalDemoModule ) },
   { path: 'modal2-demo', loadChildren: () => import( './sds-modal-demo/sds-modal-demo.module').then(m => m.SdsModalDemoModule ) },
   { path: 'pagination-demo', loadChildren: () => import( './st-pagination-demo/st-pagination-demo.module').then(m => m.StPaginationDemoModule ) },
   { path: 'pop-over-demo', loadChildren: () => import( './st-pop-over-demo/st-pop-over-demo.module').then(m => m.StPopOverDemoModule ) },
   { path: 'progress-bar-demo', loadChildren: () => import( './st-progress-bar-demo/st-progress-bar-demo.module').then(m => m.StProgressBarDemoModule ) },
   { path: 'radio-demo', loadChildren: () => import( './sds-radio-demo/sds-radio-demo.module').then(m => m.SdsRadioDemoModule ) },
   { path: 'radio-menu-demo', loadChildren: () => import( './st-radio-menu-demo/st-radio-menu-demo.module').then(m => m.StRadioMenuDemoModule ) },
   { path: 'search-demo', loadChildren: () => import( './st-search-demo/st-search-demo.module').then(m => m.StSearchDemoModule ) },
   { path: 'select-demo', loadChildren: () => import( './st-select-demo/select-demo.module').then(m => m.StSelectDemoModule ) },
   { path: 'sidebar-demo', loadChildren: () => import( './st-sidebar-demo/st-sidebar-demo.module').then(m => m.StSidebarDemoModule ) },
   { path: 'spinner-demo', loadChildren: () => import( './sds-spinner-demo/sds-spinner-demo.module').then(m => m.SdsSpinnerDemoModule ) },
   { path: 'switch-demo', loadChildren: () => import( './sds-switch-demo/sds-switch-demo.module').then(m => m.SdsSwitchDemoModule ) },
   { path: 'table-demo', loadChildren: () => import( './st-table-demo/st-table-demo.module').then(m => m.StTableDemoModule ) },
   { path: 'tag-demo', loadChildren: () => import( './st-tag-demo/st-tag-demo.module').then(m => m.StTagDemoModule) },
   { path: 'tag-input-demo', loadChildren: () => import( './st-tag-input-demo/st-tag-input-demo.module').then(m => m.StTagInputDemoModule ) },
   { path: 'textarea', loadChildren: () => import( './sds-textarea-demo/sds-textarea-demo.module').then(m => m.SdsTextareaDemoModule ) },
   { path: 'toggle-buttons-demo', loadChildren: () => import( './sds-toggle-button-demo/sds-toggle-button-demo.module').then(m => m.SdsToggleButtonDemoModule ) },
   { path: 'tooltip-demo', loadChildren: () => import( './st-tooltip-demo/st-tooltip-demo.module').then(m => m.StTooltipDemoModule ) },
   { path: 'vertical-tabs-demo', loadChildren: () => import( './st-vertical-tabs-demo/st-vertical-tabs-demo.module').then(m => m.StVerticalTabsDemoModule ) },
   { path: 'zero-page-demo', loadChildren: () => import( './st-zero-page-demo/st-zero-page-demo.module').then(m => m.StZeroPageDemoModule) }
];
// tslint:enable


export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
