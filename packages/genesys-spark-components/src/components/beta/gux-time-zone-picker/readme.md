# gux-time-picker-beta



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `value`  | `value`   |             | `string` | `undefined` |


## Dependencies

### Depends on

- [gux-option](../../stable/gux-listbox/options/gux-option)
- [gux-dropdown](../../stable/gux-dropdown)
- [gux-listbox](../../stable/gux-listbox)

### Graph
```mermaid
graph TD;
  gux-time-zone-picker-beta --> gux-option
  gux-time-zone-picker-beta --> gux-dropdown
  gux-time-zone-picker-beta --> gux-listbox
  gux-option --> gux-truncate
  gux-truncate --> gux-tooltip
  gux-dropdown --> gux-truncate
  gux-dropdown --> gux-icon
  gux-dropdown --> gux-radial-loading
  gux-dropdown --> gux-popup
  gux-listbox --> gux-radial-loading
  style gux-time-zone-picker-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
