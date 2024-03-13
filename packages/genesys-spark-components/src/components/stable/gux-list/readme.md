# gux-list

<!-- Auto Generated Below -->


## Methods

### `guxFocusFirstItem() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `guxFocusItemByClosestId(id: string) => Promise<void>`



#### Parameters

| Name | Type     | Description |
| ---- | -------- | ----------- |
| `id` | `string` |             |

#### Returns

Type: `Promise<void>`



### `guxFocusItemById(id: string) => Promise<void>`



#### Parameters

| Name | Type     | Description |
| ---- | -------- | ----------- |
| `id` | `string` |             |

#### Returns

Type: `Promise<void>`



### `guxFocusLastItem() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [gux-action-button](../gux-action-button)
 - [gux-button-multi](../gux-button-multi)
 - [gux-context-menu](../gux-context-menu)
 - [gux-table-toolbar-menu-button](../gux-table-toolbar/gux-table-toolbar-menu-button)
 - [gux-time-picker](../gux-time-picker)

### Graph
```mermaid
graph TD;
  gux-action-button --> gux-list
  gux-button-multi --> gux-list
  gux-context-menu --> gux-list
  gux-table-toolbar-menu-button --> gux-list
  gux-time-picker --> gux-list
  style gux-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
