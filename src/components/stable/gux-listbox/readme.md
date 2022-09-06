# gux-listbox

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `filter` | `filter`  |             | `string` | `''`        |
| `value`  | `value`   |             | `string` | `undefined` |


## Events

| Event                           | Description | Type               |
| ------------------------------- | ----------- | ------------------ |
| `internallistboxoptionsupdated` |             | `CustomEvent<any>` |


## Methods

### `guxSelectActive() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description                       |
| ---- | --------------------------------- |
|      | collection of gux-option elements |


## Dependencies

### Used by

 - [gux-country-select](../../beta/gux-phone-input/components/gux-country-select)
 - [gux-pagination-items-per-page](../gux-pagination/gux-pagination-items-per-page)
 - [gux-pagination-items-per-page-beta](../../beta/gux-pagination-beta/gux-pagination-items-per-page-beta)

### Graph
```mermaid
graph TD;
  gux-country-select --> gux-listbox
  gux-pagination-items-per-page --> gux-listbox
  gux-pagination-items-per-page-beta --> gux-listbox
  style gux-listbox fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
