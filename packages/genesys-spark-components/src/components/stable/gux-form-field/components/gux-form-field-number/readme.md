# gux-form-field-number



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type                                    | Default     |
| --------------- | ---------------- | ----------- | --------------------------------------- | ----------- |
| `clearable`     | `clearable`      |             | `boolean`                               | `undefined` |
| `labelPosition` | `label-position` |             | `"above" \| "beside" \| "screenreader"` | `undefined` |


## Methods

### `guxForceUpdate() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot           | Description                     |
| -------------- | ------------------------------- |
| `"error"`      | Optional slot for error message |
| `"help"`       | Optional slot for help message  |
| `"input"`      | Required slot for input tag     |
| `"label"`      | Required slot for label tag     |
| `"label-info"` | Optional slot for label tooltip |


## Shadow Parts

| Part              | Description           |
| ----------------- | --------------------- |
| `"input-section"` | Style input container |


## Dependencies

### Used by

 - [gux-pagination-ellipsis-button](../../../gux-pagination/gux-pagination-buttons/gux-pagination-ellipsis-button)

### Depends on

- [gux-form-field-label-indicator](../../helper-components/gux-form-field-optional-indicator)
- [gux-form-field-input-clear-button](../../helper-components/gux-form-field-input-clear-button)
- [gux-icon](../../../gux-icon)

### Graph
```mermaid
graph TD;
  gux-form-field-number --> gux-form-field-label-indicator
  gux-form-field-number --> gux-form-field-input-clear-button
  gux-form-field-number --> gux-icon
  gux-form-field-input-clear-button --> gux-icon
  gux-pagination-ellipsis-button --> gux-form-field-number
  style gux-form-field-number fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
