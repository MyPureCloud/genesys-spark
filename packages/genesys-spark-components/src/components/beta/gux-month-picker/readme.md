# gux-month-picker



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                     | Type                        | Default     |
| ---------- | ---------- | --------------------------------------------------------------- | --------------------------- | ----------- |
| `disabled` | `disabled` |                                                                 | `boolean`                   | `false`     |
| `max`      | `max`      | The max year and month selectable in ISO8601 format (yyyy-mm)   | `` `${string}-${string}` `` | `undefined` |
| `min`      | `min`      | The min year and month selectable in ISO8601 format (yyyy-mm)   | `` `${string}-${string}` `` | `undefined` |
| `value`    | `value`    | The current selected year and month in ISO8601 format (yyyy-mm) | `` `${string}-${string}` `` | `undefined` |


## Dependencies

### Depends on

- [gux-icon](../../stable/gux-icon)
- [gux-screen-reader-beta](../gux-screen-reader)
- [gux-month-calendar](gux-month-calendar)
- [gux-popup](../../stable/gux-popup)

### Graph
```mermaid
graph TD;
  gux-month-picker-beta --> gux-icon
  gux-month-picker-beta --> gux-screen-reader-beta
  gux-month-picker-beta --> gux-month-calendar
  gux-month-picker-beta --> gux-popup
  gux-month-calendar --> gux-icon
  gux-month-calendar --> gux-screen-reader-beta
  gux-month-calendar --> gux-month-list-item
  gux-month-calendar --> gux-month-list
  style gux-month-picker-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
