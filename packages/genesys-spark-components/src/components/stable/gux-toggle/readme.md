# gux-toggle

This is a basic toggle using a html checkbox component in it.
If the checkedLabel and uncheckedLabel are specified, label apears on the right of the component.
You can use keyboard to change the state of the component.
Space key and enter key are binded.
This component supports dark theme mode also.
A check event is triggered when the state of the component changed.

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description | Type                | Default     |
| ---------------- | ----------------- | ----------- | ------------------- | ----------- |
| `checked`        | `checked`         |             | `boolean`           | `false`     |
| `checkedLabel`   | `checked-label`   |             | `string`            | `undefined` |
| `disabled`       | `disabled`        |             | `boolean`           | `false`     |
| `displayInline`  | `display-inline`  |             | `boolean`           | `false`     |
| `errorMessage`   | `error-message`   |             | `string`            | `undefined` |
| `labelPosition`  | `label-position`  |             | `"left" \| "right"` | `'right'`   |
| `loading`        | `loading`         |             | `boolean`           | `false`     |
| `uncheckedLabel` | `unchecked-label` |             | `string`            | `undefined` |


## Events

| Event   | Description | Type                   |
| ------- | ----------- | ---------------------- |
| `check` |             | `CustomEvent<boolean>` |


## Dependencies

### Depends on

- [gux-radial-loading](../gux-radial-loading)
- [gux-icon](../gux-icon)
- [gux-toggle-slider](gux-toggle-slider)
- [gux-announce-beta](../../beta/gux-announce)

### Graph
```mermaid
graph TD;
  gux-toggle --> gux-radial-loading
  gux-toggle --> gux-icon
  gux-toggle --> gux-toggle-slider
  gux-toggle --> gux-announce-beta
  gux-toggle-slider --> gux-icon
  style gux-toggle fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
