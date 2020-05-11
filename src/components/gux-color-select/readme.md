# gux-color-select



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                      | Type     | Default     |
| -------- | --------- | -------------------------------- | -------- | ----------- |
| `value`  | `value`   | Determines the state activeColor | `string` | `undefined` |


## Events

| Event   | Description                       | Type               |
| ------- | --------------------------------- | ------------------ |
| `input` | Triggers when a color is selected | `CustomEvent<any>` |


## Dependencies

### Used by

 - [gux-color-picker](../gux-color-picker)

### Depends on

- [gux-color-option](option)

### Graph
```mermaid
graph TD;
  gux-color-select --> gux-color-option
  gux-color-picker --> gux-color-select
  style gux-color-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
