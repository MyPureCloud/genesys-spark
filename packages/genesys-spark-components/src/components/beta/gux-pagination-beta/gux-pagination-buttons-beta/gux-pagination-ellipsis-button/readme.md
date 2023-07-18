# gux-pagination-ellipsis-button



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type     | Default     |
| ------------ | ------------- | ----------- | -------- | ----------- |
| `totalPages` | `total-pages` |             | `number` | `undefined` |


## Events

| Event      | Description | Type                  |
| ---------- | ----------- | --------------------- |
| `goToPage` |             | `CustomEvent<string>` |


## Dependencies

### Used by

 - [gux-pagination-buttons-beta](..)

### Depends on

- [gux-icon](../../../../stable/gux-icon)
- [gux-tooltip](../../../../stable/gux-tooltip)
- [gux-popover-beta](../../../gux-popover-beta)
- [gux-form-field-number](../../../../stable/gux-form-field/components/gux-form-field-number)

### Graph
```mermaid
graph TD;
  gux-pagination-ellipsis-button --> gux-icon
  gux-pagination-ellipsis-button --> gux-tooltip
  gux-pagination-ellipsis-button --> gux-popover-beta
  gux-pagination-ellipsis-button --> gux-form-field-number
  gux-popover-beta --> gux-dismiss-button
  gux-dismiss-button --> gux-icon
  gux-form-field-number --> gux-form-field-input-clear-button
  gux-form-field-number --> gux-icon
  gux-form-field-input-clear-button --> gux-icon
  gux-pagination-buttons-beta --> gux-pagination-ellipsis-button
  style gux-pagination-ellipsis-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
