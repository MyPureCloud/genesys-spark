# gux-form-field-file-beta



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                                                                                                                                                                     | Type                       | Default      |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------ |
| `dropAndDrag`   | `drop-and-drag`  |                                                                                                                                                                                                                                                                                 | `boolean`                  | `false`      |
| `indicatorMark` | `indicator-mark` | Field indicator mark which can show *, (optional) or blank Defaults to required. When set to required, the component will display * for required fields and blank for optional When set to optional, the component will display (optional) for optional and blank for required. | `"optional" \| "required"` | `'required'` |


## Slots

| Slot           | Description                     |
| -------------- | ------------------------------- |
| `"error"`      | Optional slot for error message |
| `"help"`       | Optional slot for help message  |
| `"input"`      | Required slot for input tag     |
| `"label"`      | Required slot for label tag     |
| `"label-info"` | Optional slot for tooltip       |


## Dependencies

### Depends on

- [gux-form-field-label-indicator](../../helper-components/gux-form-field-optional-indicator)
- [gux-dismiss-button](../../../gux-dismiss-button)
- [gux-truncate](../../../gux-truncate)
- [gux-button-slot](../../../gux-button-slot)
- [gux-icon](../../../gux-icon)

### Graph
```mermaid
graph TD;
  gux-form-field-file-beta --> gux-form-field-label-indicator
  gux-form-field-file-beta --> gux-dismiss-button
  gux-form-field-file-beta --> gux-truncate
  gux-form-field-file-beta --> gux-button-slot
  gux-form-field-file-beta --> gux-icon
  gux-dismiss-button --> gux-button-slot
  gux-dismiss-button --> gux-icon
  gux-truncate --> gux-tooltip
  style gux-form-field-file-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
