# gux-form-field-phone



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type                                    | Default     |
| --------------- | ---------------- | ----------- | --------------------------------------- | ----------- |
| `labelPosition` | `label-position` |             | `"above" \| "beside" \| "screenreader"` | `undefined` |


## Slots

| Slot           | Description                                |
| -------------- | ------------------------------------------ |
|                | Required slot for gux-phone-input-beta tag |
| `"error"`      | Optional slot for error message            |
| `"help"`       | Optional slot for help message             |
| `"label"`      | Required slot for label tag                |
| `"label-info"` | Optional slot for label tooltip            |


## Dependencies

### Depends on

- [gux-form-field-label-indicator](../../helper-components/gux-form-field-optional-indicator)
- [gux-icon](../../../gux-icon)

### Graph
```mermaid
graph TD;
  gux-form-field-phone --> gux-form-field-label-indicator
  gux-form-field-phone --> gux-icon
  style gux-form-field-phone fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
