# gux-rating

## Native Events

| Event    | Description | Type               |
| -------- | ----------- | ------------------ |
| `change` |             | `InputEvent`       |
| `input`  |             | `InputEvent`       |

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description | Type                  | Default     |
| ----------- | ----------- | ----------- | --------------------- | ----------- |
| `compact`   | `compact`   |             | `boolean`             | `false`     |
| `disabled`  | `disabled`  |             | `boolean`             | `false`     |
| `increment` | `increment` |             | `"default" \| "half"` | `'default'` |
| `maxValue`  | `max-value` |             | `number`              | `5`         |
| `readonly`  | `readonly`  |             | `boolean`             | `false`     |
| `value`     | `value`     |             | `number`              | `0`         |


## Dependencies

### Used by

 - [gux-rating](.)

### Depends on

- [gux-icon](../gux-icon)
- [gux-button](../gux-button)
- [gux-popover-beta](../../beta/gux-popover-beta)
- [gux-rating](.)

### Graph
```mermaid
graph TD;
  gux-rating --> gux-rating
  gux-button --> gux-tooltip-beta
  gux-tooltip-beta --> gux-tooltip-base-beta
  gux-popover-beta --> gux-dismiss-button
  gux-dismiss-button --> gux-button-slot
  gux-dismiss-button --> gux-icon
  style gux-rating fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
