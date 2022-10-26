# gux-form-field-phone



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type                                    | Default     |
| --------------- | ---------------- | ----------- | --------------------------------------- | ----------- |
| `labelPosition` | `label-position` |             | `"above" \| "beside" \| "screenreader"` | `undefined` |


## Events

| Event                  | Description | Type                   |
| ---------------------- | ----------- | ---------------------- |
| `phonevalidationerror` |             | `CustomEvent<boolean>` |


## Slots

| Slot      | Description                                |
| --------- | ------------------------------------------ |
|           | Required slot for gux-time-picker-beta tag |
| `"error"` | Optional slot for error message            |
| `"label"` | Required slot for label tag                |


## Dependencies

### Depends on

- [gux-screen-reader-beta](../../../../beta/gux-screen-reader)
- [gux-icon](../../../gux-icon)

### Graph
```mermaid
graph TD;
  gux-form-field-phone --> gux-screen-reader-beta
  gux-form-field-phone --> gux-icon
  style gux-form-field-phone fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
