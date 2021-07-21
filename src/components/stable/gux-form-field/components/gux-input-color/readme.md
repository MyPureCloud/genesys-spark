# gux-input-color



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type      | Default     |
| ------------- | -------------- | ----------- | --------- | ----------- |
| `guxErrorId`  | `gux-error-id` |             | `string`  | `undefined` |
| `guxLabelId`  | `gux-label-id` |             | `string`  | `undefined` |
| `guxRequired` | `gux-required` |             | `boolean` | `undefined` |


## Slots

| Slot      | Description                           |
| --------- | ------------------------------------- |
| `"input"` | Required slot for input[type="color"] |


## Dependencies

### Used by

 - [gux-form-field](../..)

### Depends on

- [gux-icon](../../../gux-icon)
- [gux-color-select](./components/gux-color-select)

### Graph
```mermaid
graph TD;
  gux-input-color --> gux-icon
  gux-input-color --> gux-color-select
  gux-color-select --> gux-input-color-option
  gux-form-field --> gux-input-color
  style gux-input-color fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
