# genesys-pagination

A pagination control intended to be used underneath a table or grid with paged
content. Given a total number of items, the view will automatically calculate
a total number of pages (you can optionally supply the number of items per page
and/or initial starting page).

When a user changes pages, the component will emit a `pageChanged` event with
the newly selected page.


<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                                                                                                | Type     |
| ---------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `currentPage`    | `current-page`    | The currently select page. Changes are watched by the component.                                                                                                           | `number` |
| `paginationSize` | `pagination-size` | The responsive size of the control to use: "small", "medium", or "large". See the exported recommendedBreakpoints for the pixel widths that are recommended for each size. | `string` |
| `totalItems`     | `total-items`     | The total number of items in the data set. Used to calculate total page count                                                                                              | `number` |


## Events

| Event                 | Detail | Description                                             |
| --------------------- | ------ | ------------------------------------------------------- |
| `itemsPerPageChanged` | number | Fired when user selects a new number of items per page. |
| `pageChanged`         | number | Fired when the current page property changes.           |


## Methods

### `setItemsPerPage(value: number, options?: number[]) => void`

Sets the number of items to display on a single page, and optionally the list
of items that the user can choose from in the dropdown.

If options are omitted, the user selection dropdown won't be displayed.

#### Parameters

| Name      | Type       | Description                           |
| --------- | ---------- | ------------------------------------- |
| `value`   | `number`   | The number of items to show per page. |
| `options` | `number[]` | The values the user can choose from.  |

#### Returns

Type: `void`



### `setPage(page: number) => void`



#### Parameters

| Name   | Type     | Description |
| ------ | -------- | ----------- |
| `page` | `number` |             |

#### Returns

Type: `void`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
