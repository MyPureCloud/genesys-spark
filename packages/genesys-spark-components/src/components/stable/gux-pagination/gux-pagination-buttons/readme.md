# gux-pagination-buttons

An internal component used by the gux-pagination component.


<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type                     | Default      |
| ------------- | -------------- | ----------- | ------------------------ | ------------ |
| `currentPage` | `current-page` |             | `number`                 | `undefined`  |
| `disabled`    | `disabled`     |             | `boolean`                | `false`      |
| `layout`      | `layout`       |             | `"advanced" \| "simple"` | `'advanced'` |
| `totalPages`  | `total-pages`  |             | `number`                 | `undefined`  |


## Events

| Event                       | Description | Type                  |
| --------------------------- | ----------- | --------------------- |
| `internalcurrentpagechange` |             | `CustomEvent<number>` |


## Dependencies

### Used by

 - [gux-pagination](..)

### Depends on

- [gux-button-slot](../../gux-button-slot)
- [gux-pagination-ellipsis-button](gux-pagination-ellipsis-button)
- [gux-icon](../../gux-icon)

### Graph
```mermaid
graph TD;
  gux-pagination-buttons --> gux-button-slot
  gux-pagination-buttons --> gux-pagination-ellipsis-button
  gux-pagination-buttons --> gux-icon
  gux-pagination-ellipsis-button --> gux-button
  gux-pagination-ellipsis-button --> gux-icon
  gux-pagination-ellipsis-button --> gux-tooltip
  gux-pagination-ellipsis-button --> gux-popover
  gux-pagination-ellipsis-button --> gux-form-field-number
  gux-button --> gux-tooltip-beta
  gux-tooltip-beta --> gux-tooltip-base-beta
  gux-popover --> gux-dismiss-button
  gux-dismiss-button --> gux-button-slot
  gux-dismiss-button --> gux-icon
  gux-form-field-number --> gux-form-field-label-indicator
  gux-form-field-number --> gux-form-field-input-clear-button
  gux-form-field-number --> gux-icon
  gux-form-field-input-clear-button --> gux-icon
  gux-pagination --> gux-pagination-buttons
  style gux-pagination-buttons fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
