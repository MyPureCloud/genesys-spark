# gux-listbox

<!-- Auto Generated Below -->


## Overview

The listbox component provides keyboard bindings and a11y patterns for selecting
from a list of options.

## Properties

| Property       | Attribute       | Description | Type                                  | Default     |
| -------------- | --------------- | ----------- | ------------------------------------- | ----------- |
| `disabled`     | `disabled`      |             | `boolean`                             | `false`     |
| `emptyMessage` | `empty-message` |             | `string`                              | `undefined` |
| `filter`       | `filter`        |             | `string`                              | `''`        |
| `filterType`   | `filter-type`   |             | `"custom" \| "none" \| "starts-with"` | `'none'`    |
| `loading`      | `loading`       |             | `boolean`                             | `false`     |
| `value`        | `value`         |             | `string`                              | `undefined` |


## Events

| Event                           | Description | Type               |
| ------------------------------- | ----------- | ------------------ |
| `internallistboxoptionsupdated` |             | `CustomEvent<any>` |


## Methods

### `guxSelectActive() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description                                                             |
| ---- | ----------------------------------------------------------------------- |
|      | collection of elements conforming to the ListboxOptionElement interface |


## Dependencies

### Used by

 - [gux-pagination-items-per-page](../gux-pagination/gux-pagination-items-per-page)
 - [gux-pagination-items-per-page-legacy](../../legacy/gux-pagination-legacy/gux-pagination-items-per-page-legacy)
 - [gux-phone-input-beta](../../beta/gux-phone-input)
 - [gux-time-zone-picker-beta](../../beta/gux-time-zone-picker)

### Depends on

- [gux-radial-loading](../gux-radial-loading)

### Graph
```mermaid
graph TD;
  gux-listbox --> gux-radial-loading
  gux-pagination-items-per-page --> gux-listbox
  gux-pagination-items-per-page-legacy --> gux-listbox
  gux-phone-input-beta --> gux-listbox
  gux-time-zone-picker-beta --> gux-listbox
  style gux-listbox fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
