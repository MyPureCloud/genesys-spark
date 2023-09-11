# gux-dropdown

<!-- Auto Generated Below -->


## Overview

Our Dropdown component. In the most basic case, it's used with `gux-option` to give users
a list of text options to select from, but other types of options with different appearance
can be created by creating a new component and adding it to `validOptionTags` list in
gux-dropdown-types.ts, then following the resulting compiler errors.

## Properties

| Property      | Attribute     | Description                                                           | Type                                  | Default     |
| ------------- | ------------- | --------------------------------------------------------------------- | ------------------------------------- | ----------- |
| `disabled`    | `disabled`    |                                                                       | `boolean`                             | `false`     |
| `filterType`  | `filter-type` |                                                                       | `"custom" \| "none" \| "starts-with"` | `'none'`    |
| `filterable`  | `filterable`  | deprecated will be removed in v4 (COMUI-1369). Use filterType instead | `boolean`                             | `false`     |
| `hasError`    | `has-error`   |                                                                       | `boolean`                             | `false`     |
| `loading`     | `loading`     |                                                                       | `boolean`                             | `false`     |
| `placeholder` | `placeholder` |                                                                       | `string`                              | `undefined` |
| `required`    | `required`    |                                                                       | `boolean`                             | `false`     |
| `value`       | `value`       |                                                                       | `string`                              | `undefined` |


## Events

| Event          | Description | Type                  |
| -------------- | ----------- | --------------------- |
| `guxcollapsed` |             | `CustomEvent<void>`   |
| `guxexpanded`  |             | `CustomEvent<void>`   |
| `guxfilter`    |             | `CustomEvent<string>` |


## Slots

| Slot | Description                                               |
| ---- | --------------------------------------------------------- |
|      | for a gux-listbox containing ValidDropdownOption children |


## Dependencies

### Used by

 - [gux-pagination-items-per-page](../gux-pagination/gux-pagination-items-per-page)
 - [gux-pagination-items-per-page-beta](../../beta/gux-pagination-beta/gux-pagination-items-per-page-beta)
 - [gux-time-zone-picker-beta](../../beta/gux-time-zone-picker)

### Depends on

- [gux-truncate-beta](../../beta/gux-truncate)
- [gux-icon](../gux-icon)
- [gux-radial-loading](../gux-radial-loading)
- [gux-popup-beta](../../beta/gux-popup-beta)

### Graph
```mermaid
graph TD;
  gux-dropdown --> gux-truncate-beta
  gux-dropdown --> gux-icon
  gux-dropdown --> gux-radial-loading
  gux-dropdown --> gux-popup-beta
  gux-truncate-beta --> gux-tooltip
  gux-pagination-items-per-page --> gux-dropdown
  gux-pagination-items-per-page-beta --> gux-dropdown
  gux-time-zone-picker-beta --> gux-dropdown
  style gux-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
