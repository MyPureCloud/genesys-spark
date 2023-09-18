# gux-pagination-items-per-page

An internal component used by the gux-pagination component.


<!-- Auto Generated Below -->


## Properties

| Property       | Attribute        | Description | Type                    | Default |
| -------------- | ---------------- | ----------- | ----------------------- | ------- |
| `itemsPerPage` | `items-per-page` |             | `100 \| 25 \| 50 \| 75` | `25`    |


## Events

| Event                        | Description | Type                  |
| ---------------------------- | ----------- | --------------------- |
| `internalitemsperpagechange` |             | `CustomEvent<number>` |


## Dependencies

### Used by

 - [gux-pagination](..)

### Depends on

- [gux-dropdown](../../gux-dropdown)
- [gux-listbox](../../gux-listbox)
- [gux-option](../../gux-listbox/options/gux-option)

### Graph
```mermaid
graph TD;
  gux-pagination-items-per-page --> gux-dropdown
  gux-pagination-items-per-page --> gux-listbox
  gux-pagination-items-per-page --> gux-option
  gux-dropdown --> gux-truncate
  gux-dropdown --> gux-icon
  gux-dropdown --> gux-radial-loading
  gux-dropdown --> gux-popup
  gux-truncate --> gux-tooltip
  gux-listbox --> gux-radial-loading
  gux-option --> gux-truncate
  gux-pagination --> gux-pagination-items-per-page
  style gux-pagination-items-per-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
