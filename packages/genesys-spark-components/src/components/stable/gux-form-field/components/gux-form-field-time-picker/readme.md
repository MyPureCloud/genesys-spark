# gux-form-field-time-picker



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                                                                                                                                                                     | Type                                    | Default     |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ----------- |
| `indicatorMark` | `indicator-mark` | Field indicator mark which can show *, (optional) or blank Defaults to required. When set to required, the component will display * for required fields and blank for optional When set to optional, the component will display (optional) for optional and blank for required. | `"optional" \| "required"`              | `undefined` |
| `labelPosition` | `label-position` |                                                                                                                                                                                                                                                                                 | `"above" \| "beside" \| "screenreader"` | `undefined` |


## Slots

| Slot                                      | Description                     |
| ----------------------------------------- | ------------------------------- |
| `"Required slot for gux-time-picker tag"` |                                 |
| `"error"`                                 | Optional slot for error message |
| `"help"`                                  | Optional slot for help message  |
| `"label"`                                 | Required slot for label tag     |


## Dependencies

### Depends on

- [gux-screen-reader-beta](../../../../beta/gux-screen-reader)
- [gux-icon](../../../gux-icon)
- [gux-form-field-label-indicator](../../helper-components/gux-form-field-optional-indicator)

### Graph
```mermaid
graph TD;
  gux-form-field-time-picker --> gux-screen-reader-beta
  gux-form-field-time-picker --> gux-icon
  gux-form-field-time-picker --> gux-form-field-label-indicator
  style gux-form-field-time-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
