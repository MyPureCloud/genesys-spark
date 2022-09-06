# gux-phone-input

Input for international phone numbers

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type                                    | Default     |
| --------------- | ---------------- | ----------- | --------------------------------------- | ----------- |
| `defaultRegion` | `default-region` |             | `string`                                | `'us'`      |
| `labelPosition` | `label-position` |             | `"above" \| "beside" \| "screenreader"` | `undefined` |
| `value`         | `value`          |             | `string`                                | `undefined` |


## Events

| Event   | Description | Type                   |
| ------- | ----------- | ---------------------- |
| `error` |             | `CustomEvent<boolean>` |
| `input` |             | `CustomEvent<string>`  |


## Dependencies

### Depends on

- [gux-country-select](./components/gux-country-select)

### Graph
```mermaid
graph TD;
  gux-phone-input-beta --> gux-country-select
  gux-country-select --> gux-icon
  gux-country-select --> gux-country-icon
  gux-country-select --> gux-option
  gux-country-select --> gux-listbox
  gux-country-select --> gux-popup
  style gux-phone-input-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
