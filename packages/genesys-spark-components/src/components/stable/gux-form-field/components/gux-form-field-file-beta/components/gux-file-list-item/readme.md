# gux-file-list-item



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute  | Description | Type                                             | Default     |
| -------------------- | ---------- | ----------- | ------------------------------------------------ | ----------- |
| `disabled`           | `disabled` |             | `boolean`                                        | `false`     |
| `index` _(required)_ | `index`    |             | `number`                                         | `undefined` |
| `name` _(required)_  | `name`     |             | `string`                                         | `undefined` |
| `status`             | `status`   |             | `"default" \| "error" \| "loading" \| "success"` | `undefined` |


## Events

| Event           | Description | Type                  |
| --------------- | ----------- | --------------------- |
| `guxremovefile` |             | `CustomEvent<number>` |


## Dependencies

### Used by

 - [gux-form-field-file-beta](../..)

### Depends on

- [gux-truncate](../../../../../gux-truncate)
- [gux-radial-loading](../../../../../gux-radial-loading)
- [gux-icon-tooltip-beta](../../../../../../beta/gux-icon-tooltip)
- [gux-button-slot](../../../../../gux-button-slot)
- [gux-icon](../../../../../gux-icon)
- [gux-screen-reader-beta](../../../../../../beta/gux-screen-reader)

### Graph
```mermaid
graph TD;
  gux-file-list-item --> gux-truncate
  gux-file-list-item --> gux-radial-loading
  gux-file-list-item --> gux-icon-tooltip-beta
  gux-file-list-item --> gux-button-slot
  gux-file-list-item --> gux-icon
  gux-file-list-item --> gux-screen-reader-beta
  gux-truncate --> gux-tooltip
  gux-icon-tooltip-beta --> gux-screen-reader-beta
  gux-icon-tooltip-beta --> gux-icon
  gux-icon-tooltip-beta --> gux-tooltip-beta
  gux-tooltip-beta --> gux-tooltip-base-beta
  gux-form-field-file-beta --> gux-file-list-item
  style gux-file-list-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
