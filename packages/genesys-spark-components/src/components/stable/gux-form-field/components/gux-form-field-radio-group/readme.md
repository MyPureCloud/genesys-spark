# gux-form-field-radio



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                                                                                                                                                                     | Type                       | Default     |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ----------- |
| `disabled`      | `disabled`       | Disables the radio buttons in the group.                                                                                                                                                                                                                                        | `boolean`                  | `false`     |
| `indicatorMark` | `indicator-mark` | Field indicator mark which can show *, (optional) or blank Defaults to required. When set to required, the component will display * for required fields and blank for optional When set to optional, the component will display (optional) for optional and blank for required. | `"optional" \| "required"` | `undefined` |


## Slots

| Slot            | Description                     |
| --------------- | ------------------------------- |
| `"group-error"` | Optional slot for error message |
| `"group-help"`  | Optional slot for help message  |
| `"group-label"` | Required slot for label tag     |


## Dependencies

### Depends on

- [gux-screen-reader-beta](../../../../beta/gux-screen-reader)
- [gux-icon](../../../gux-icon)
- [gux-form-field-label-indicator](../../helper-components/gux-form-field-optional-indicator)

### Graph
```mermaid
graph TD;
  gux-form-field-radio-group-beta --> gux-screen-reader-beta
  gux-form-field-radio-group-beta --> gux-icon
  gux-form-field-radio-group-beta --> gux-form-field-label-indicator
  style gux-form-field-radio-group-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
