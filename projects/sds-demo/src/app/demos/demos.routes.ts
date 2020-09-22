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
   { id: 'sds-alert', name: 'Alert', path: 'alerts-demo', moduleLazyLoad: 'SdsAlertDemoModule' },
   { id: 'sds-tab', name: 'Tab', path: 'tab-demo', moduleLazyLoad: 'SdsTabModule' },
   { id: 'sds-radio', name: 'Radio Button', path: 'radio-demo', moduleLazyLoad: 'SdsRadioDemoModule' },
   { id: 'sds-switch', name: 'Switch', path: 'switch-demo', moduleLazyLoad: 'SdsSwitchDemoModule' },
   { id: 'sds-toggle-button', name: 'Toggle Button', path: 'toggle-buttons-demo', moduleLazyLoad: 'SdsToggleButtonDemoModule' },
   { id: 'sds-spinner', name: 'Spinner', path: 'spinner-demo', moduleLazyLoad: 'SdsSpinnerDemoModule' },
   { id: 'sds-modal', name: 'Modal', path: 'modal2-demo', moduleLazyLoad: 'SdsModalDemoModule' },
   { id: 'sds-button', name: 'Button', path: 'button-demo', moduleLazyLoad: 'SdsButtonDemoModule' },
   { id: 'sds-textarea', name: 'Textarea', path: 'textarea', moduleLazyLoad: 'SdsTextareaDemoModule' },
   { id: 'sds-tag', name: 'Tag', path: 'tag-demo', moduleLazyLoad: 'SdsTagDemoModule' },
   { id: 'sds-notification', name: 'Notification',
      path: 'notification-demo', moduleLazyLoad: '@SdsNotificationModule' },
   { id: 'sds-tooltip', name: 'Tooltip', path: 'tooltip-demo', moduleLazyLoad: 'SdsTooltipDemoModule' }
];


export const EGEO_DEMO_MENU_SDS: SdsDemoMenu[] = [
   { id: 'st-input', name: 'Input', path: 'input', moduleLazyLoad: 'StInputDemoModule' },
   { id: 'st-select', name: 'Select', path: 'select-demo', moduleLazyLoad: 'StSelectDemoModule' },
   { id: 'st-dropdown-menu', name: 'Dropdown Menu', path: 'dropdown-menu-demo', moduleLazyLoad: 'StDropdownMenuDemoModule' },
   { id: 'st-pagination', name: 'Pagination', path: 'pagination-demo', moduleLazyLoad: 'StPaginationDemoModule' },
   { id: 'st-breadcrumbs', name: 'Breadcrumb', path: 'breadcrumbs', moduleLazyLoad: 'StBreadcrumbsDemoModule' },
   { id: 'st-table', name: 'Table', path: 'table-demo', moduleLazyLoad: 'StTableDemoModule' },
   { id: 'st-tag-input', name: 'Tag Input', path: 'tag-input-demo', moduleLazyLoad: 'StTagInputDemoModule' }
];

export const EGEO_DEMO_MENU: SdsDemoMenu[] = [
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
   { path: 'alerts-demo', loadChildren: () => import( './sds-alert-demo/sds-alert-demo.module').then(m => m.SdsAlertDemoModule) },
   { path: 'breadcrumbs', loadChildren: () => import( './st-breadcrumbs-demo/st-breadcrumbs-demo.module').then(m => m.StBreadcrumbsDemoModule ) },
   { path: 'button-demo', loadChildren: () => import( './sds-button-demo/sds-button-demo.module').then(m => m.SdsButtonDemoModule ) },
   { path: 'checkbox-demo', loadChildren: () => import( './sds-checkbox-demo/sds-checkbox-demo.module').then(m => m.SdsCheckboxDemoModule ) },
   { path: 'dropdown-menu-demo', loadChildren: () => import( './st-dropdown-menu-demo/st-dropdown-menu-demo.module').then(m => m.StDropdownMenuDemoModule ) },
   { path: 'file-button-demo', loadChildren: () => import( './st-file-button-demo/st-file-button-demo.module').then(m => m.StFileButtonDemoModule ) },
   { path: 'filter-selector-demo', loadChildren: () => import( './st-filter-selector-demo/st-filter-selector-demo.module').then(m => m.StFilterSelectorDemoModule ) },
   { path: 'notification-demo', loadChildren: () => import( './sds-notification-demo/sds-notification-demo.module').then(m => m.SdsNotificationDemoModule ) },
   { path: 'form-demo', loadChildren: () => import( './st-form-demo/st-form-demo.module').then(m => m.StFormDemoModule ) },
   { path: 'form-list-demo', loadChildren: () => import( './st-form-list-demo/st-form-list-demo.module').then(m => m.StFormListDemoModule ) },
   { path: 'fullscreen-layout-demo', loadChildren: () => import( './st-fullscreen-layout-demo/st-fullscreen-layout-demo.module').then(m => m.StFullscreenLayoutDemoModule ) },
   { path: 'header-demo', loadChildren: () => import( './st-header-demo/st-header-demo.module').then(m => m.StHeaderDemoModule ) },
   { path: 'tab-demo', loadChildren: () => import( './sds-tab-demo/sds-tab-demo.module').then(m => m.SdsTabDemoModule ) },
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
   { path: 'tag-demo', loadChildren: () => import( './sds-tag-demo/sds-tag-demo.module').then(m => m.SdsTagDemoModule) },
   { path: 'tag-input-demo', loadChildren: () => import( './st-tag-input-demo/st-tag-input-demo.module').then(m => m.StTagInputDemoModule ) },
   { path: 'textarea', loadChildren: () => import( './sds-textarea-demo/sds-textarea-demo.module').then(m => m.SdsTextareaDemoModule ) },
   { path: 'toggle-buttons-demo', loadChildren: () => import( './sds-toggle-button-demo/sds-toggle-button-demo.module').then(m => m.SdsToggleButtonDemoModule ) },
   { path: 'tooltip-demo', loadChildren: () => import( './sds-tooltip-demo/sds-tooltip-demo.module').then(m => m.SdsTooltipDemoModule ) },
   { path: 'zero-page-demo', loadChildren: () => import( './st-zero-page-demo/st-zero-page-demo.module').then(m => m.StZeroPageDemoModule) }
];
// tslint:enable


export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
