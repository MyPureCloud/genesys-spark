# gux-segmented-control-item

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description | Type      | Default     |
| ---------- | ----------- | ----------- | --------- | ----------- |
| `disabled` | `disabled`  |             | `boolean` | `false`     |
| `iconOnly` | `icon-only` |             | `boolean` | `false`     |
| `selected` | `selected`  |             | `boolean` | `false`     |
| `value`    | `value`     |             | `string`  | `undefined` |


## Slots

| Slot     | Description               |
| -------- | ------------------------- |
| `"icon"` | optional slot for an icon |
| `"text"` | required slot for text    |


## Dependencies

### Depends on

- [gux-tooltip-beta](../../gux-tooltip-beta)
- [gux-segmented-control-divider](../gux-segmented-control-divider)

### Graph
```mermaid
graph TD;
  gux-segmented-control-item --> gux-tooltip-beta
  gux-segmented-control-item --> gux-segmented-control-divider
  gux-tooltip-beta --> gux-tooltip-base-beta
  style gux-segmented-control-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
