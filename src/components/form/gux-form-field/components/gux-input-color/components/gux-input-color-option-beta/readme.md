# gux-input-color-option



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                      | Type      | Default     |
| -------- | --------- | -------------------------------------------------------------------------------- | --------- | ----------- |
| `active` | `active`  | Indicate if the tile is active                                                   | `boolean` | `undefined` |
| `value`  | `value`   | Indicate the color of the tile, if undefined, tile will be blank and be disabled | `string`  | `undefined` |


## Events

| Event         | Description                       | Type               |
| ------------- | --------------------------------- | ------------------ |
| `colorSelect` | Triggers when a color is selected | `CustomEvent<any>` |


## Dependencies

### Used by

 - [gux-input-color-select-beta](../gux-color-select-beta)

### Graph
```mermaid
graph TD;
  gux-input-color-select-beta --> gux-input-color-option-beta
  style gux-input-color-option-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
