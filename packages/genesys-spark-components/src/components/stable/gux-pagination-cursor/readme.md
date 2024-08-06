# gux-pagination-cursor



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute        | Description                                                                                    | Type                     | Default     |
| -------------- | ---------------- | ---------------------------------------------------------------------------------------------- | ------------------------ | ----------- |
| `hasNext`      | `has-next`       |                                                                                                | `boolean`                | `false`     |
| `hasPrevious`  | `has-previous`   |                                                                                                | `boolean`                | `false`     |
| `itemsPerPage` | `items-per-page` | Optional. Shows items per page dropdown when set. Only available with layout set to 'advanced' | `100 \| 25 \| 50 \| 75`  | `undefined` |
| `label`        | `label`          |                                                                                                | `string`                 | `undefined` |
| `layout`       | `layout`         |                                                                                                | `"advanced" \| "simple"` | `'simple'`  |


## Events

| Event                       | Description | Type                                |
| --------------------------- | ----------- | ----------------------------------- |
| `guxitemsperpagechange`     |             | `CustomEvent<number>`               |
| `guxPaginationCursorchange` |             | `CustomEvent<"next" \| "previous">` |


## Dependencies

### Depends on

- [gux-button-slot](../gux-button-slot)
- [gux-icon](../gux-icon)
- [gux-pagination-items-per-page](../gux-pagination/gux-pagination-items-per-page)

### Graph
```mermaid
graph TD;
  gux-pagination-cursor --> gux-button-slot
  gux-pagination-cursor --> gux-icon
  gux-pagination-cursor --> gux-pagination-items-per-page
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
  style gux-pagination-cursor fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
