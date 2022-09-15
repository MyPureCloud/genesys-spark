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

 - [gux-action-button](../gux-action-button)
 - [gux-action-button-legacy](../../legacy/gux-action-button-legacy)
 - [gux-advanced-dropdown](../gux-advanced-dropdown)
 - [gux-button-multi](../gux-button-multi)
 - [gux-button-multi-legacy](../../legacy/gux-button-multi-legacy)
 - [gux-dropdown](../gux-dropdown)
 - [gux-dropdown-multi-beta](../../beta/gux-dropdown-multi)
 - [gux-month-picker-beta](../../beta/gux-month-picker)

### Graph
```mermaid
graph TD;
  gux-action-button --> gux-popup
  gux-action-button-legacy --> gux-popup
  gux-advanced-dropdown --> gux-popup
  gux-button-multi --> gux-popup
  gux-button-multi-legacy --> gux-popup
  gux-dropdown --> gux-popup
  gux-dropdown-multi-beta --> gux-popup
  gux-month-picker-beta --> gux-popup
  style gux-popup fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
