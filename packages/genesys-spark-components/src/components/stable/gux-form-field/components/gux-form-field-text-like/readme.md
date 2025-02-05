# gux-form-field-text-like



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                                                                                                                                                                     | Type                                    | Default      |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------ |
| `clearable`     | `clearable`      |                                                                                                                                                                                                                                                                                 | `boolean`                               | `undefined`  |
| `indicatorMark` | `indicator-mark` | Field indicator mark which can show *, (optional) or blank Defaults to required. When set to required, the component will display * for required fields and blank for optional When set to optional, the component will display (optional) for optional and blank for required. | `"none" \| "optional" \| "required"`    | `'required'` |
| `labelPosition` | `label-position` |                                                                                                                                                                                                                                                                                 | `"above" \| "beside" \| "screenreader"` | `undefined`  |
| `loading`       | `loading`        |                                                                                                                                                                                                                                                                                 | `boolean`                               | `false`      |


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
| `"prefix"`     | Optional slot for prefix        |
| `"suffix"`     | Optional slot for suffix        |


## Dependencies

### Used by

 - [gux-pagination-buttons-legacy](../../../../legacy/gux-pagination-legacy/gux-pagination-buttons-legacy)
 - [gux-rich-text-editor-action-link](../../../../beta/gux-rich-text-editor/gux-rich-text-editor-action/gux-rich-text-editor-action-link)

### Depends on

- [gux-radial-loading](../../../gux-radial-loading)
- [gux-form-field-label-indicator](../../helper-components/gux-form-field-label-indicator)
- [gux-form-field-input-clear-button](../../helper-components/gux-form-field-input-clear-button)
- [gux-icon](../../../gux-icon)

### Graph
```mermaid
graph TD;
  gux-form-field-text-like --> gux-radial-loading
  gux-form-field-text-like --> gux-form-field-label-indicator
  gux-form-field-text-like --> gux-form-field-input-clear-button
  gux-form-field-text-like --> gux-icon
  gux-form-field-input-clear-button --> gux-icon
  gux-pagination-buttons-legacy --> gux-form-field-text-like
  gux-rich-text-editor-action-link --> gux-form-field-text-like
  style gux-form-field-text-like fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
