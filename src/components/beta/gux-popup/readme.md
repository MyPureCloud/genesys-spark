# gux-input



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type      | Default |
| ---------- | ---------- | ----------- | --------- | ------- |
| `disabled` | `disabled` |             | `boolean` | `false` |
| `expanded` | `expanded` |             | `boolean` | `false` |


## Slots

| Slot       | Description              |
| ---------- | ------------------------ |
| `"popup"`  | Required slot for popup  |
| `"target"` | Required slot for target |


## Dependencies

### Used by

 - [gux-action-button](../../stable/gux-action-button)
 - [gux-button-multi](../gux-button-multi)
 - [gux-dropdown-v2-beta](../gux-dropdown-v2)

### Graph
```mermaid
graph TD;
  gux-action-button --> gux-popup-beta
  gux-button-multi --> gux-popup-beta
  gux-dropdown-v2-beta --> gux-popup-beta
  style gux-popup-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
