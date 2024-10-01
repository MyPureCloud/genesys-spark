# gux-pagination

A pagination control intended to be used underneath a table or grid with paged
content. Given a total number of items, the view will automatically calculate
a total number of pages (you can optionally supply the number of items per page
and/or initial starting page).

When a user changes pages, the component will emit a `guxpaginationchange` event with
the pagination state.


<!-- Auto Generated Below -->


## Properties

| Property       | Attribute        | Description                                                                     | Type                     | Default      |
| -------------- | ---------------- | ------------------------------------------------------------------------------- | ------------------------ | ------------ |
| `currentPage`  | `current-page`   | The currently select page. Changes are watched by the component.                | `number`                 | `1`          |
| `disabled`     | `disabled`       |                                                                                 | `boolean`                | `false`      |
| `itemsPerPage` | `items-per-page` | The max number of items on a page. Used to calculate total page count           | `100 \| 25 \| 50 \| 75`  | `25`         |
| `layout`       | `layout`         | The pagination component can have different layouts to suit the available space | `"advanced" \| "simple"` | `'advanced'` |
| `totalItems`   | `total-items`    | The total number of items in the data set. Used to calculate total page count   | `number`                 | `0`          |


## Events

| Event                 | Description | Type                                                          |
| --------------------- | ----------- | ------------------------------------------------------------- |
| `guxpaginationchange` |             | `CustomEvent<{ currentPage: number; itemsPerPage: number; }>` |


## Dependencies

### Depends on

- [gux-pagination-item-counts](gux-pagination-item-counts)
- [gux-pagination-items-per-page](gux-pagination-items-per-page)
- [gux-pagination-buttons](gux-pagination-buttons)

### Graph
```mermaid
graph TD;
  gux-pagination --> gux-pagination-item-counts
  gux-pagination --> gux-pagination-items-per-page
  gux-pagination --> gux-pagination-buttons
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
  gux-pagination-buttons --> gux-button-slot
  gux-pagination-buttons --> gux-pagination-ellipsis-button
  gux-pagination-buttons --> gux-icon
  gux-pagination-ellipsis-button --> gux-button
  gux-pagination-ellipsis-button --> gux-icon
  gux-pagination-ellipsis-button --> gux-tooltip
  gux-pagination-ellipsis-button --> gux-popover
  gux-pagination-ellipsis-button --> gux-form-field-number
  gux-popover --> gux-dismiss-button
  gux-dismiss-button --> gux-button-slot
  gux-dismiss-button --> gux-icon
  gux-form-field-number --> gux-form-field-label-indicator
  gux-form-field-number --> gux-form-field-input-clear-button
  gux-form-field-number --> gux-icon
  gux-form-field-input-clear-button --> gux-icon
  style gux-pagination fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
