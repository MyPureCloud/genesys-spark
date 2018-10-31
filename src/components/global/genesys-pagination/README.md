# genesys-pagination

A pagination control intended to be used underneath a table or grid with paged
content. Given a total number of items, the view will automatically calculate
a total number of pages (you can optionally supply the number of items per page
and/or initial starting page).

When a user changes pages, the component will emit a `pageChanged` event with
the newly selected page.

## Props

| Property              | Attribute                | Description                                                                         | Type       |
|-----------------------|--------------------------|-------------------------------------------------------------------------------------|------------|
| `currentPage`         | `current-page`           | The currently select page. Changes are watched by the component.                    | `Number`   |
| `totalItems`          | `total-items`            | The total number of items in the data set. Used to calculate total page count.      | `Number`   |
| `itemsPerPage`        | `items-per-page`         | The number of items on each page. Default: `25`                                     | `Number`   |
| `itemsPerPageOptions` | `items-per-page-options` | *Not Implemented* The selectable options for items-per-page. Default: `[25,50,100]` | `Number[]` |

## Events

| Event                 | Description                                                               | Type     |
|-----------------------|---------------------------------------------------------------------------|----------|
| `pageChanged`         | Fired when the current page property changes.                             | `Number` |
| `itemsPerPageChanged` | *Not Implemented* Fired when user selects a new number of items per page. | `Number` |
