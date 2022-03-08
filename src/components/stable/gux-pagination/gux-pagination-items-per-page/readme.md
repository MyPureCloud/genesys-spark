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

- [gux-dropdown-v2-beta](../../../beta/gux-dropdown-v2)
- [gux-listbox](../../../beta/gux-listbox)
- [gux-option-v2](../../../beta/gux-listbox/gux-option-v2)

### Graph
```mermaid
graph TD;
  gux-pagination-items-per-page --> gux-dropdown-v2-beta
  gux-pagination-items-per-page --> gux-listbox
  gux-pagination-items-per-page --> gux-option-v2
  gux-dropdown-v2-beta --> gux-icon
  gux-dropdown-v2-beta --> gux-popup-beta
  gux-pagination --> gux-pagination-items-per-page
  style gux-pagination-items-per-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
