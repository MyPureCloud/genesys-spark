# gux-dropdown-multi-tag



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description       | Type      | Default |
| ---------------- | ----------------- | ----------------- | --------- | ------- |
| `disabled`       | `disabled`        | Tag is removable. | `boolean` | `false` |
| `numberSelected` | `number-selected` |                   | `number`  | `0`     |


## Events

| Event              | Description                           | Type                  |
| ------------------ | ------------------------------------- | --------------------- |
| `guxclearselected` | Triggered when click on remove button | `CustomEvent<string>` |


## Dependencies

### Used by

 - [gux-dropdown-multi-beta](..)

### Depends on

- [gux-icon](../../../stable/gux-icon)

### Graph
```mermaid
graph TD;
  gux-dropdown-multi-tag --> gux-icon
  gux-dropdown-multi-beta --> gux-dropdown-multi-tag
  style gux-dropdown-multi-tag fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
