# gux-option

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type      | Default     |
| ---------- | ---------- | ----------- | --------- | ----------- |
| `active`   | `active`   |             | `boolean` | `false`     |
| `disabled` | `disabled` |             | `boolean` | `false`     |
| `filtered` | `filtered` |             | `boolean` | `false`     |
| `selected` | `selected` |             | `boolean` | `false`     |
| `value`    | `value`    |             | `string`  | `undefined` |


## Slots

| Slot        | Description               |
| ----------- | ------------------------- |
|             | text                      |
| `"subtext"` | Optional slot for subtext |


## Dependencies

### Used by

 - [gux-pagination-items-per-page](../../../gux-pagination/gux-pagination-items-per-page)
 - [gux-pagination-items-per-page-legacy](../../../../legacy/gux-pagination-legacy/gux-pagination-items-per-page-legacy)
 - [gux-phone-input-beta](../../../../beta/gux-phone-input)
 - [gux-time-zone-picker-beta](../../../../beta/gux-time-zone-picker)

### Depends on

- [gux-truncate](../../../gux-truncate)

### Graph
```mermaid
graph TD;
  gux-option --> gux-truncate
  gux-truncate --> gux-tooltip
  gux-pagination-items-per-page --> gux-option
  gux-pagination-items-per-page-legacy --> gux-option
  gux-phone-input-beta --> gux-option
  gux-time-zone-picker-beta --> gux-option
  style gux-option fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
