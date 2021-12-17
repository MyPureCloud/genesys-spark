# gux-phone-input

Input for international phone numbers

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `value`  | `value`   |             | `string` | `undefined` |


## Dependencies

### Depends on

- [gux-country-select](./components/gux-country-select)

### Graph
```mermaid
graph TD;
  gux-phone-input-beta --> gux-country-select
  gux-country-select --> gux-list-item
  gux-country-select --> gux-country-icon
  gux-country-select --> gux-popup-beta
  gux-country-select --> gux-icon
  gux-country-select --> gux-list
  gux-list-item --> gux-text-highlight
  style gux-phone-input-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
