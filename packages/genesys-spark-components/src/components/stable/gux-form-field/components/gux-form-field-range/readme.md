# gux-form-field-range



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description | Type                                    | Default     |
| ---------------- | ------------------ | ----------- | --------------------------------------- | ----------- |
| `displayUnits`   | `display-units`    |             | `string`                                | `undefined` |
| `labelPosition`  | `label-position`   |             | `"above" \| "beside" \| "screenreader"` | `undefined` |
| `valueInTooltip` | `value-in-tooltip` |             | `boolean`                               | `undefined` |


## Slots

| Slot           | Description                     |
| -------------- | ------------------------------- |
| `"error"`      | Optional slot for error message |
| `"help"`       | Optional slot for help message  |
| `"input"`      | Required slot for input tag     |
| `"label"`      | Required slot for label tag     |
| `"label-info"` | Optional slot for label tooltip |


## Dependencies

### Depends on

- [gux-form-field-label-indicator](../../helper-components/gux-form-field-optional-indicator)
- [gux-tooltip-base-beta](../../../../beta/gux-tooltip-base)
- [gux-icon](../../../gux-icon)

### Graph
```mermaid
graph TD;
  gux-form-field-range --> gux-form-field-label-indicator
  gux-form-field-range --> gux-tooltip-base-beta
  gux-form-field-range --> gux-icon
  style gux-form-field-range fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
