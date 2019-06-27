# gux-pagination-buttons

An internal component used by the gux-pagination component.


<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type     | Default     |
| ------------- | -------------- | ----------- | -------- | ----------- |
| `currentPage` | `current-page` |             | `number` | `undefined` |
| `totalPages`  | `total-pages`  |             | `number` | `undefined` |


## Events

| Event                | Description | Type                  |
| -------------------- | ----------- | --------------------- |
| `currentPageChanged` |             | `CustomEvent<number>` |


## Dependencies

### Used by

 - [gux-pagination](..)

### Depends on

- [gux-button](../../gux-button)
- [gux-text-field](../../gux-text-field)

### Graph
```mermaid
graph TD;
  gux-pagination-buttons --> gux-button
  gux-pagination-buttons --> gux-text-field
  gux-pagination --> gux-pagination-buttons
  style gux-pagination-buttons fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
