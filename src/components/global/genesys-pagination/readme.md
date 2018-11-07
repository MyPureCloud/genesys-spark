# genesys-pagination

A pagination control intended to be used underneath a table or grid with paged
content. Given a total number of items, the view will automatically calculate
a total number of pages (you can optionally supply the number of items per page
and/or initial starting page).

When a user changes pages, the component will emit a `pageChanged` event with
the newly selected page.

## Props

| Property      | Attribute      | Description                                                                    | Type     |
| :------------ | :------------- | :----------------------------------------------------------------------------- | :------- |
| `currentPage` | `current-page` | The currently select page. Changes are watched by the component.               | `Number` |
| `totalItems`  | `total-items`  | The total number of items in the data set. Used to calculate total page count. | `Number` |

## Events

| Event                 | Description                                             | Type     |
| :-------------------- | :------------------------------------------------------ | :------- |
| `pageChanged`         | Fired when the current page property changes.           | `Number` |
| `itemsPerPageChanged` | Fired when user selects a new number of items per page. | `Number` |

## Methods

### `setItemsPerPage(value: number, options: number[] | undefined) => void`

Sets the number of items to display on a single page, and optionally the list
of items that the user can choose from in the dropdown.

#### Parameters

| Name      | Type                   | Description                                                                                |
| :-------- | :--------------------- | :----------------------------------------------------------------------------------------- |
| `value`   | `number`               | The new number of items to display per page.                                               |
| `options` | `number[] | undefined` | If provided, this will overwrite the user's options for changing the items per page value. |

#### Returns

Type: `void`
