# gux-popup



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type      | Default |
| ---------- | ---------- | ----------- | --------- | ------- |
| `disabled` | `disabled` |             | `boolean` | `false` |
| `expanded` | `expanded` |             | `boolean` | `false` |


## Events

| Event               | Description                                                          | Type                |
| ------------------- | -------------------------------------------------------------------- | ------------------- |
| `internalcollapsed` | This event will run when the popup transitions to a collapsed state. | `CustomEvent<void>` |
| `internalexpanded`  | This event will run when the popup transitions to an expanded state. | `CustomEvent<void>` |


## Slots

| Slot       | Description              |
| ---------- | ------------------------ |
| `"popup"`  | Required slot for popup  |
| `"target"` | Required slot for target |


## Shadow Parts

| Part                    | Description |
| ----------------------- | ----------- |
| `"gux-popup-container"` |             |


## Dependencies

### Used by

 - [gux-action-button](../gux-action-button)
 - [gux-advanced-dropdown-legacy](../../legacy/gux-advanced-dropdown-legacy)
 - [gux-button-multi](../gux-button-multi)
 - [gux-context-menu-beta](../../beta/gux-context-menu)
 - [gux-dropdown](../gux-dropdown)
 - [gux-dropdown-multi-beta](../../beta/gux-dropdown-multi)
 - [gux-month-picker-beta](../../beta/gux-month-picker)
 - [gux-phone-input-beta](../../beta/gux-phone-input)
 - [gux-table-toolbar-menu-button](../../beta/gux-table-toolbar/gux-table-toolbar-menu-button)
 - [gux-time-picker](../gux-time-picker)

### Graph
```mermaid
graph TD;
  gux-action-button --> gux-popup
  gux-advanced-dropdown-legacy --> gux-popup
  gux-button-multi --> gux-popup
  gux-context-menu-beta --> gux-popup
  gux-dropdown --> gux-popup
  gux-dropdown-multi-beta --> gux-popup
  gux-month-picker-beta --> gux-popup
  gux-phone-input-beta --> gux-popup
  gux-table-toolbar-menu-button --> gux-popup
  gux-time-picker --> gux-popup
  style gux-popup fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
