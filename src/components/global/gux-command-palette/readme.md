# gux-command-palette

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                      | Type         | Default     |
| ------------- | -------------- | -------------------------------- | ------------ | ----------- |
| `filterValue` | `filter-value` | The current search value.        | `string`     | `undefined` |
| `items`       | --             | The full command list.           | `ICommand[]` | `[]`        |
| `visible`     | `visible`      | If the command palette is shown. | `boolean`    | `false`     |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [gux-search](../gux-search)
- [gux-list](../gux-list)

### Graph
```mermaid
graph TD;
  gux-command-palette --> gux-search
  gux-command-palette --> gux-list
  gux-search --> gux-text-field
  style gux-command-palette fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
