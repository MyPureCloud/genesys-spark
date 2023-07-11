# gux-pagination-buttons

An internal component used by the gux-pagination component.


<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type                     | Default      |
| ------------- | -------------- | ----------- | ------------------------ | ------------ |
| `currentPage` | `current-page` |             | `number`                 | `undefined`  |
| `layout`      | `layout`       |             | `"advanced" \| "simple"` | `'advanced'` |
| `totalPages`  | `total-pages`  |             | `number`                 | `undefined`  |


## Events

| Event                       | Description | Type                  |
| --------------------------- | ----------- | --------------------- |
| `internalcurrentpagechange` |             | `CustomEvent<number>` |


## Dependencies

### Used by

 - [gux-pagination-beta](..)

### Depends on

- [gux-pagination-ellipsis-button](gux-pagination-ellipsis-button)
- [gux-button-slot-beta](../../gux-button-slot)
- [gux-icon](../../../stable/gux-icon)

### Graph
```mermaid
graph TD;
  gux-pagination-buttons-beta --> gux-pagination-ellipsis-button
  gux-pagination-buttons-beta --> gux-button-slot-beta
  gux-pagination-buttons-beta --> gux-icon
  gux-pagination-ellipsis-button --> gux-icon
  gux-pagination-ellipsis-button --> gux-tooltip
  gux-pagination-ellipsis-button --> gux-popover-beta
  gux-pagination-ellipsis-button --> gux-form-field-number
  gux-popover-beta --> gux-dismiss-button
  gux-dismiss-button --> gux-icon
  gux-form-field-number --> gux-form-field-input-clear-button
  gux-form-field-number --> gux-icon
  gux-form-field-input-clear-button --> gux-icon
  gux-pagination-beta --> gux-pagination-buttons-beta
  style gux-pagination-buttons-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
