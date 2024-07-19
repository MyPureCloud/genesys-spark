# gux-pagination-legacy

A pagination control intended to be used underneath a table or grid with paged
content. Given a total number of items, the view will automatically calculate
a total number of pages (you can optionally supply the number of items per page
and/or initial starting page).

When a user changes pages, the component will emit a `guxpaginationchange` event with
the pagination state.


<!-- Auto Generated Below -->


## Properties

| Property       | Attribute        | Description                                                                     | Type                              | Default  |
| -------------- | ---------------- | ------------------------------------------------------------------------------- | --------------------------------- | -------- |
| `currentPage`  | `current-page`   | The currently select page. Changes are watched by the component.                | `number`                          | `1`      |
| `itemsPerPage` | `items-per-page` | The max number of items on a page. Used to calculate total page count           | `100 \| 25 \| 50 \| 75`           | `25`     |
| `layout`       | `layout`         | The pagination component can have different layouts to suit the available space | `"expanded" \| "full" \| "small"` | `'full'` |
| `totalItems`   | `total-items`    | The total number of items in the data set. Used to calculate total page count   | `number`                          | `0`      |


## Events

| Event                 | Description | Type                                                          |
| --------------------- | ----------- | ------------------------------------------------------------- |
| `guxpaginationchange` |             | `CustomEvent<{ currentPage: number; itemsPerPage: number; }>` |


## Dependencies

### Depends on

- [gux-pagination-item-counts-legacy](gux-pagination-item-counts-legacy)
- [gux-pagination-items-per-page-legacy](gux-pagination-items-per-page-legacy)
- [gux-pagination-buttons-legacy](gux-pagination-buttons-legacy)

### Graph
```mermaid
graph TD;
  gux-pagination-legacy --> gux-pagination-item-counts-legacy
  gux-pagination-legacy --> gux-pagination-items-per-page-legacy
  gux-pagination-legacy --> gux-pagination-buttons-legacy
  gux-pagination-items-per-page-legacy --> gux-dropdown
  gux-pagination-items-per-page-legacy --> gux-listbox
  gux-pagination-items-per-page-legacy --> gux-option
  gux-dropdown --> gux-truncate
  gux-dropdown --> gux-icon
  gux-dropdown --> gux-radial-loading
  gux-dropdown --> gux-popup
  gux-truncate --> gux-tooltip
  gux-listbox --> gux-radial-loading
  gux-option --> gux-truncate
  gux-pagination-buttons-legacy --> gux-form-field-text-like
  gux-pagination-buttons-legacy --> gux-button-slot
  gux-pagination-buttons-legacy --> gux-icon
  gux-form-field-text-like --> gux-radial-loading
  gux-form-field-text-like --> gux-form-field-label-indicator
  gux-form-field-text-like --> gux-form-field-input-clear-button
  gux-form-field-text-like --> gux-icon
  gux-form-field-input-clear-button --> gux-icon
  style gux-pagination-legacy fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
