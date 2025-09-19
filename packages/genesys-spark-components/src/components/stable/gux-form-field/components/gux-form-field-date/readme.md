# gux-form-field-date



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                                                                                                                                                                     | Type                                    | Default      |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------ |
| `indicatorMark` | `indicator-mark` | Field indicator mark which can show *, (optional) or blank Defaults to required. When set to required, the component will display * for required fields and blank for optional When set to optional, the component will display (optional) for optional and blank for required. | `"none" \| "optional" \| "required"`    | `'required'` |
| `labelPosition` | `label-position` |                                                                                                                                                                                                                                                                                 | `"above" \| "beside" \| "screenreader"` | `undefined`  |


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


## Dependencies

### Depends on

- [gux-form-field-label-indicator](../../helper-components/gux-form-field-label-indicator)
- [gux-popup](../../../gux-popup)
- [gux-form-field-input-clear-button](../../helper-components/gux-form-field-input-clear-button)
- [gux-button-slot](../../../gux-button-slot)
- [gux-icon](../../../gux-icon)
- [gux-screen-reader-beta](../../../../beta/gux-screen-reader)
- [gux-calendar](../../../gux-calendar)

### Graph
```mermaid
graph TD;
  dux-form-field-date-beta --> gux-form-field-label-indicator
  dux-form-field-date-beta --> gux-popup
  dux-form-field-date-beta --> gux-form-field-input-clear-button
  dux-form-field-date-beta --> gux-button-slot
  dux-form-field-date-beta --> gux-icon
  dux-form-field-date-beta --> gux-screen-reader-beta
  dux-form-field-date-beta --> gux-calendar
  gux-form-field-input-clear-button --> gux-icon
  gux-form-field-input-clear-button --> gux-tooltip-beta
  gux-tooltip-beta --> gux-tooltip-base-beta
  gux-calendar --> gux-icon
  style dux-form-field-date-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
