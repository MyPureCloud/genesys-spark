# gux-color-picker



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                  | Type      | Default     |
| ---------- | ---------- | -------------------------------------------- | --------- | ----------- |
| `disabled` | `disabled` | Indicates if the dropdown is disabled or not | `boolean` | `undefined` |
| `value`    | `value`    | Determines the state activeColor             | `string`  | `undefined` |


## Events

| Event   | Description                       | Type               |
| ------- | --------------------------------- | ------------------ |
| `input` | Triggers when a color is selected | `CustomEvent<any>` |


## Dependencies

### Depends on

- [gux-icon](../gux-icon)
- [gux-color-select](../gux-color-select)

### Graph
```mermaid
graph TD;
  gux-color-picker --> gux-icon
  gux-color-picker --> gux-color-select
  gux-color-select --> gux-color-option
  style gux-color-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
