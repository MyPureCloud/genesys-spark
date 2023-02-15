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

 - [gux-pagination-beta](..)

### Depends on

- [gux-dropdown](../../../stable/gux-dropdown)
- [gux-listbox](../../../stable/gux-listbox)
- [gux-option](../../../stable/gux-listbox/options/gux-option)

### Graph
```mermaid
graph TD;
  gux-pagination-items-per-page-beta --> gux-dropdown
  gux-pagination-items-per-page-beta --> gux-listbox
  gux-pagination-items-per-page-beta --> gux-option
  gux-dropdown --> gux-icon
  gux-dropdown --> gux-radial-loading
  gux-dropdown --> gux-popup-beta
  gux-listbox --> gux-radial-loading
  gux-pagination-beta --> gux-pagination-items-per-page-beta
  style gux-pagination-items-per-page-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
