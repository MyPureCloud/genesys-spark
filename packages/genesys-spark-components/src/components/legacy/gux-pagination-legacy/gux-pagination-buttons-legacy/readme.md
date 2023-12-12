# gux-pagination-buttons-legacy

An internal component used by the gux-pagination component.


<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type                              | Default     |
| ------------- | -------------- | ----------- | --------------------------------- | ----------- |
| `currentPage` | `current-page` |             | `number`                          | `undefined` |
| `layout`      | `layout`       |             | `"expanded" \| "full" \| "small"` | `'full'`    |
| `totalPages`  | `total-pages`  |             | `number`                          | `undefined` |


## Events

| Event                       | Description | Type                  |
| --------------------------- | ----------- | --------------------- |
| `internalcurrentpagechange` |             | `CustomEvent<number>` |


## Dependencies

### Used by

 - [gux-pagination-legacy](..)

### Depends on

- [gux-form-field-text-like](../../../stable/gux-form-field/components/gux-form-field-text-like)
- [gux-button-slot](../../../stable/gux-button-slot)
- [gux-icon](../../../stable/gux-icon)

### Graph
```mermaid
graph TD;
  gux-pagination-buttons-legacy --> gux-form-field-text-like
  gux-pagination-buttons-legacy --> gux-button-slot
  gux-pagination-buttons-legacy --> gux-icon
  gux-form-field-text-like --> gux-radial-loading
  gux-form-field-text-like --> gux-form-field-input-clear-button
  gux-form-field-text-like --> gux-icon
  gux-form-field-input-clear-button --> gux-icon
  gux-pagination-legacy --> gux-pagination-buttons-legacy
  style gux-pagination-buttons-legacy fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
