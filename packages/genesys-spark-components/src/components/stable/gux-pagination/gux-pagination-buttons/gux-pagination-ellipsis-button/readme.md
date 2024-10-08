# gux-pagination-ellipsis-button



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type      | Default     |
| ------------ | ------------- | ----------- | --------- | ----------- |
| `disabled`   | `disabled`    |             | `boolean` | `false`     |
| `totalPages` | `total-pages` |             | `number`  | `undefined` |


## Events

| Event      | Description | Type                  |
| ---------- | ----------- | --------------------- |
| `goToPage` |             | `CustomEvent<string>` |


## Dependencies

### Used by

 - [gux-pagination-buttons](..)

### Depends on

- [gux-button](../../../gux-button)
- [gux-icon](../../../gux-icon)
- [gux-tooltip](../../../gux-tooltip)
- [gux-popover](../../../gux-popover)
- [gux-form-field-number](../../../gux-form-field/components/gux-form-field-number)

### Graph
```mermaid
graph TD;
  gux-pagination-ellipsis-button --> gux-button
  gux-pagination-ellipsis-button --> gux-icon
  gux-pagination-ellipsis-button --> gux-tooltip
  gux-pagination-ellipsis-button --> gux-popover
  gux-pagination-ellipsis-button --> gux-form-field-number
  gux-popover --> gux-dismiss-button
  gux-dismiss-button --> gux-button-slot
  gux-dismiss-button --> gux-icon
  gux-form-field-number --> gux-form-field-label-indicator
  gux-form-field-number --> gux-form-field-input-clear-button
  gux-form-field-number --> gux-icon
  gux-form-field-input-clear-button --> gux-icon
  gux-pagination-buttons --> gux-pagination-ellipsis-button
  style gux-pagination-ellipsis-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
