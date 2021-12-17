# gux-country-select



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description | Type     | Default     |
| ---------------- | ----------------- | ----------- | -------- | ----------- |
| `countryCode`    | `country-code`    |             | `string` | `undefined` |
| `defaultCountry` | `default-country` |             | `string` | `undefined` |


## Dependencies

### Used by

 - [gux-phone-input-beta](../..)

### Depends on

- [gux-list-item](../../../../stable/gux-list/list-item)
- [gux-country-icon](../gux-country-icon)
- [gux-popup-beta](../../../gux-popup)
- [gux-icon](../../../../stable/gux-icon)
- [gux-list](../../../../stable/gux-list)

### Graph
```mermaid
graph TD;
  gux-country-select --> gux-list-item
  gux-country-select --> gux-country-icon
  gux-country-select --> gux-popup-beta
  gux-country-select --> gux-icon
  gux-country-select --> gux-list
  gux-list-item --> gux-text-highlight
  gux-phone-input-beta --> gux-country-select
  style gux-country-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
