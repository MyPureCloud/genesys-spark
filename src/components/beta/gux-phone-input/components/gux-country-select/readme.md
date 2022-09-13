# gux-country-select



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type      | Default     |
| ---------- | ---------- | ----------- | --------- | ----------- |
| `disabled` | `disabled` |             | `boolean` | `false`     |
| `labelId`  | `label-id` |             | `string`  | `undefined` |
| `region`   | `region`   |             | `string`  | `undefined` |


## Events

| Event                   | Description | Type               |
| ----------------------- | ----------- | ------------------ |
| `internalregionupdated` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [gux-phone-input-beta](../..)

### Depends on

- [gux-icon](../../../../stable/gux-icon)
- [gux-country-icon](../gux-country-icon)
- [gux-option](../../../../stable/gux-listbox/gux-option)
- [gux-listbox](../../../../stable/gux-listbox)
- [gux-popup](../../../../stable/gux-popup)

### Graph
```mermaid
graph TD;
  gux-country-select --> gux-icon
  gux-country-select --> gux-country-icon
  gux-country-select --> gux-option
  gux-country-select --> gux-listbox
  gux-country-select --> gux-popup
  gux-phone-input-beta --> gux-country-select
  style gux-country-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
