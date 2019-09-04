# gux-pagination-items-per-page

An internal component used by the gux-pagination component.


<!-- Auto Generated Below -->


## Properties

| Property              | Attribute        | Description | Type                                             | Default             |
| --------------------- | ---------------- | ----------- | ------------------------------------------------ | ------------------- |
| `i18n`                | --               |             | `(resourceKey: string, context?: any) => string` | `undefined`         |
| `itemsPerPage`        | `items-per-page` |             | `number`                                         | `25`                |
| `itemsPerPageOptions` | --               |             | `number[]`                                       | `[25, 50, 75, 100]` |


## Events

| Event                 | Description | Type                  |
| --------------------- | ----------- | --------------------- |
| `itemsPerPageChanged` |             | `CustomEvent<number>` |


## Methods

### `setItemsPerPage(value: number, options: number[]) => void`



#### Parameters

| Name      | Type       | Description |
| --------- | ---------- | ----------- |
| `value`   | `number`   |             |
| `options` | `number[]` |             |

#### Returns

Type: `void`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
