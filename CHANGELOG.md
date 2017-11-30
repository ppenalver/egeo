# Changelog

## 6.0.0 (upcoming)

**Fixed bugs:**

* st-modal: Removed space when modal does not have buttons
* st-modal: Reorder buttons in delete confirmation modal

**New features:**

* st-modal: Added new function showBasicModal to show Info, Confirmation and Delete Modals
* st-header: New input "navigateByDefault" for prevent navigation when click 
* st-header: Add new parameter "external" to model to define external links
* st-header: Add new parameter "openInNewPage" to model to define if open new tab when navigate to link 
* st-progress-bar: create component
* st-widget: Implement loading state

 **Breaking changes:**

* st-modal: Removed function showDeleteConfirmation

## 5.0.0 (November 15, 2017)

**New features:**

* st-file-button: Create component to upload files
* st-modal: New parameter fullscreen for fullscreen modals
* st-modal: New parameter messageTitle to add a title before messages
* st-modal: New parameter maxWidth to define modal max width
* st-modal: New parameter closeOnClick in StModalButton, for close modal when click this button
* st-modal: New parameter leftIcon and rightIcon in StModalButton to add icons to buttons
* st-modal: New parameter response in StModalButton to pass a callback function to one button
* st-sidebar: Create component to navigate through different sections 
* st-launcher: Create component to display and launch different instances
* st-pop: Add offset input to move floating component
* st-pop: Change placement type to define with enum
* st-dropdown-menu: Add offset and change placement type input for adapt to st-pop
* st-dropdown-menu: Add input to select item with input
* st-dropdown-menu: Add input to move selected on top when show
* st-dropdown-menu: Add input to apply selected style
* st-select: Add output for emit when expand menu named expand
* st-select: Add output for emit when select an item named select
* st-pop-over: Create component to pop over a content with a title

**Fixed bugs:**

* st-tooltip: Fix empty title bug
* st-header: Fix user menu width

**Breaking changes:**

* icons: Update new version of icon library
* st-header: Change submenu behaviour, now act as arrow no navigate to first option
* st-dropdown: Removed component
* st-dropdown-menu: Remove qaTag now read from id if exists
* st-dropdown-menu: Refactor styles
* st-select: Refactor component and add new styles
* st-select: Remove input qaTag now read from id if exists
* st-select: Rename input errorRequiredMessage to errorMessage
* st-select: Rename input selectedValue to selected
* st-select: Remove input forceValidations
* st-modal: Refactor styles
* st-modal: Remove main text
* st-modal: Remove modal type
* st-modal: Remove modal width
* st-modal: Remove qaTag
* st-modal: Remove closeOnAccept
* st-modal: In StModalButton change response by responseValue
* st-modal: In StModalButton remove icon
* st-modal: In StModalButton remove iconLeft
* st-modal: In StModalButton remove primary
* st-modal: In StModalButton remove closeOnAccept
* st-modal: Modified params to showDeleteConfirmation

## 4.0.0 (September 21, 2017)

**Fixed bugs:**

* grid: fix container and row flexbox behaviors
* st-breadcrumbs: Fix qaTags
* st-dropdown: Fix qaTags
* st-page-title: Fix bug when page is refreshed, the editable page title is displayed wrong
* st-search: Send an empty search when the user presses the cross button
* st-checkbox: Fix disabled style

**New features:**

* st-label: New component based on label native tag
* st-header: Menu notifies navigation
* st-table: Add functionality to select rows optionally
* st-breadcrumb: Add input for define max elements to show

**Breaking changes:**

* st-header: Remove stHeaderBehavior directive because now it's unnecessary
* st-header: Change contentChangeOffset parameter by changeHeight
* st-header: Removed app name, now use a ng-content to define
* st-header: Removed user menu, now use a ng-content to define
* st-header: Removed company name input
* st-header: Remove disable parameter of menu and submenu model
* st-header: Models change of name
* st-header: Change general behaviour and design
* st-input-adjustable: Rename directive 'StInputAdjustable' to st-input-adjustable
* st-switch: Remove labelPosition input, label always are dispayed at the left
* st-horizontal-tabs: Event emitted when active tabs changes, now sends the option of type StHorizontalTab 
* st-horizontal-tabs: Removed functionality to display disabled tabs
* st-button: Removed component now use native tag and classes
* st-select: Output emitted when select is changed is now the value of the option instead of the entire option
* st-form-label: Deleted, replaced by st-label
* st-tooltip: New behaviour based on native tag

**Refactor**

* st-radio: Apply new style according to UX specifications
* st-table: Apply new style according to UX specifications
* st-switch: Apply new style according to UX specifications
* st-breadcrumb: Apply new style according to UX specifications
* st-horizontal-tabs: Apply new style according to UX specifications
* st-select: Apply new style according to UX specifications
* st-textarea: Apply new style according to UX specifications
* st-input: Apply new style according to UX specifications
* st-input: Refactor styles to can be applied to a native input
* All: Removed all references old fonts in all components
* st-table: Remove unneeded cell when there is not a hover menu

**Documentation:**

* Update license
* st-checkbox: Added demo
* st-radio: Added demo
* st-table: Added demo
* st-horizontal-tabs: Added demo
* st-select: Added demo
* st-textarea: Added demo
* st-footer: Added demo
* st-info-card: Added demo
* st-toggle-buttons: Added demo
* st-vertical-tabs: Added demo

**Others**

* egeo-theme is now part of this repository and old repo it's deprecated
* egeo-ui-base is integrated now on theme and old repo it's deprecated


## 3.0.2 (September 14, 2017)

**Fixed bugs:**

* st-button: Update internal text value when change input 

## 3.0.1 (September 01, 2017)

**Fixed bugs:**

* st-tree: Fix Failed to insert St-Tree Module provider missing
* st-tree: Fix selected from elements
* st-tree: Fix dbblick to elements for expand

## 3.0.0 (August 18, 2017)

**Fixed bugs:**

* st-two-list-selection: Fix when list is empty, height not showing correctly
* st-item-list: Add item list to egeo module
* st-dropdown: Fix inputs immutable
* st-switch: Change input id to <name>-input

**Breaking changes:**

* st-combobox: Renamed to st-select
* st-search: Remove searchOnlyOnClick and hasClearButton parameters
* st-breadcrumbs: Rename output event changeOption to select
* st-pop: Remove option to position in left or right
* st-pop: Remove input gpuAcceleration
* st-dropdown-menu: Remove option to position in left or right

**New features:**

* st-toggle-buttons: Add an optional id to the interface
* st-breadcrumbs: Add component st-breadcrumbs item, add Ng-Content option
* st-input: Add input value and output change
* st-form: Create a dynamic form with inputs
* st-form: Add switches to dynamic form
* update stratio-theme to 0.14.0

**Refactor:**

* st-pop: Remove popperjs library and implement our solution

## 2.5.0 (July 13, 2017)

**Fixed bugs:**

* Fix styles on st-input
* Fix styles on st-vertical-tabs
* Fix styles on st-horizontal-tabs

**New features:**

* New component st-items-list
* New component st-tree
* New component st-alerts
* Add number inputs and min/max validations

## 2.4.4 (July 13, 2017)

**Fixed bugs:**

* Add missing tslib dependency

## 2.4.3 (July 11, 2017)

**Fixed bugs:**

* Fix when resolve not found any translateable element and pass empty array to translate

## 2.4.2 (July 05, 2017)

**Fixed bugs:**

* Fix Search with autocomplete emit twice

## 2.4.1 (June 30, 2017)

**Fixed bugs:**

* Fix popper imports

## 2.4.0 (June 29, 2017)

**Fixed bugs:**

* Fix of left button position in page title
* Fix a wrong overflow of dropdown-menu items in firefox

**New features:**

* Create st-object-to-array pipe to iterate over an object in a template
* Add to dropdown-menu option to be always floating
* Add to dropdown-menu to resize update when resize the main window.
* New component st-tip
* New component st-help
* Add option to autocomplete in search

**Deprecated:**

* st-search: hasClearButton, that will be removed in a future release
* st-search: searchOnlyOnClick, that will be removed in a future release

## 2.3.2 (June 21, 2017)

* Fix st-comobobox validations

## 2.3.1 (June 19, 2017)

* Fix st-two-list styles
* Fix AoT compilation

## 2.3.0 (June 13, 2017)

* Bugfix st-switch component emits event twice
* New component st-combobox
* Add new feature in st-page-title: Editable Title

## 2.2.2 (June 06, 2017)

* Bugfix st-two-list remove min height
* Bugfix st-two-list no wrap long lines

## 2.2.1 (June 06, 2017)

* Bugfix st-switch add name as input

## 2.2.0 (June 05, 2017)

* Bugfix st-two-list dropdown
* Add style to st-two-list when select row
* Refactor decorators now all start by St
* Improvement in st-switch template
* Add st-pop component
* Allow Able or disable for columns singly

## 2.1.1 (May 29, 2017)

* Bugfix #148 and #248
* Add St-pop Component

## 2.1.0 (May 19, 2017)

* Add st-checkbox component
* Add st-two-list

## 2.0.2 (May 05, 2017)

* fix st-textarea borders

## 2.0.1 (May 04, 2017)

* fix st-textarea styles

## 2.0.0 (May 04, 2017)

* Update angular version to angular 4.1.0
* Refactor of build method
* Create textarea component
* Create form label component
* Create switch component
* Bugfix #212 (St-table): Allow to introduce a model with id and label as header item

## 1.5.0 (April 25, 2017)

* Extract theme of info-card
* Extract theme of input
* Extract theme of tab-box
* Extract theme of toggle-buttons
* Extract theme of tooltip
* Extract theme of vertical-tabs
* Extract theme of search
* Reduce bundle size
* Add Breadcrumbs component
* Create table component

## 1.4.1 (April 17, 2017)

* fix AOT bug with StRadio Component

## 1.4.0 (April 17, 2017)

* Add st-radio and st-radio-group components
* Add test to EgeoResolve
* Bugfix #144 and #77
* Update spinner styles to remove margins
* Increase test coverage in all components
* EgDeprecated decorator

## 1.3.3 (April 05, 2017)

* export all elements of stModalInterface

## 1.3.2 (April 05, 2017)

* fix infinite loop in modal close

## 1.3.1 (April 03, 2017)

* export stModalResponse

## 1.3.0 (April 03, 2017)

* st-modal and StModalService
* Add max-lenght validation on inputs
* Force to install some dependencies
* st-tab-box as stateless component
* Bugfix pagination

## 1.2.0 (March 17, 2017)

* Remove st-table from website
* Add test coverage 67% to st-input
* Add new search options (Live search and only emit on click)
* Separate library and website
* Add test to st-spinner
* Add test to st-tooltip
* Prepare for publish release

## 1.1.2 (March 09, 2017)

* Adapt to Nexus3

## 1.1.1 (March 08, 2017)

* Add max-width to header component

## 1.1.0 (March 06, 2017)

* Add isFocused parameter on input component to set the focus on the input
* Add distribution as AoT
* Add Required and CheckRequired decorators.
* Add search filter pipe
* Add EgeoUtils with some static common functions

## 1.0.0 (February 23, 2017)

* Modularize all components
* Add Button Clear in Search Component
* Add Value Input in Search Component
* Add optional Pre-title to Page Title Component
* Update color definitions
* Add util service for manage translations of complex objects
* Update fonts in sass for use body istead open-sans and heading instead brandon-grotesque
* Fix some problems with fonts
* Info Box now have a variable height and with that adapt to content and container
* Info Box now have two new inputs, height and with to fix height and with in pixels
* Added Pagination component
* Remove external padding in vertical tab component
* **BREAKING CHANGE:** Remove ng2-translate dependency
* **BREAKING CHANGE:** Now egeo is imported like this ```import { EgeoModule } from 'egeo';```
* **BREAKING CHANGE:** Output Search Component change of (onSearch) to (search)
* **BREAKING CHANGE:** Vertical menu now is called Vertical Tabs
* **BREAKING CHANGE:** Vertical menu now not emit active when active is set from outside
* **BREAKING CHANGE:** Vertical menu output change from changedOption to changeOption
* **AND ALL FIX OF VERSION 0.6.1**

## 0.6.1 (February 08, 2017)

* Prevent horizontal-tab wrong shown when zoom the browser
* Add qaTag in info-cards
* Fix broken spinner component

## 0.6.0 (February 06, 2017)

* Update colors with new values, possibility of getting in RGB format and documentation with RGB info.
* Add alpha channel to the egeo-get-color API.
* Apply complete design of sidebar in the documentation website.
* Review and update libraries.
* Fix Button event is launched when disabled.
* Remove PostCSS
* New dropdown menu component
* New dropdown component
* Rename old horizontal tabs to toggle buttons
* New horizontal tab component
* New Input component
* Generic class for manage events
* Solve minor bugs
* Add coverage reports
* Refactor Footer component for support internal url, logos and now with tests
* New Header component
* Add button to page title

## 0.5.0 (December 12, 2016)

* Change repository name for Egeo
* Fix bad URL imports in the new UI-Base Sass files.
* Separate font faces and fonts in a separate CSS and process
* Remove old implementations of egeo.ui.base and rewrite imports to the new /ui-base
* Fix linting errors
* Add PostCSS support
* Update to Angular 2.1.0 and Typescript 2.0.3 with types in npm
* Add radio menu component
* New component Title Page
* Total refactor of repository
* New search component
* New button component

## 0.4.0 (November 02, 2016)

* New horizontal tab component
* New tab box component
* Spinner in modificable list while input is undefined

## 0.3.0 (September 23, 2016)

* Spinner component
* Modificable List component
* Footer component
* Input component bugs and improvements
* Info card component
* Update to Angular2 final release
* Regular expression utils
+ Vertical menu component
* Close tooltip with click, keydown or mouse wheel

## 0.2.0 (September 21, 2016)

* Several components
* Update to Angular2-rc.6

## 0.1.0 (September 1, 2016)

* First iteration of egeo angular 2 components using Angular2-rc.5
