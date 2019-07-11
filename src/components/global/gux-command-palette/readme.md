# gux-command-palette

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                   | Type         | Default     |
| ------------- | -------------- | ------------------------------------------------------------- | ------------ | ----------- |
| `allItems`    | --             | The full command list.                                        | `ICommand[]` | `[]`        |
| `filterValue` | `filter-value` |                                                               | `string`     | `undefined` |
| `recentItems` | --             | The recent list. The user specific list of recent activities. | `ICommand[]` | `[]`        |


## Dependencies

### Depends on

- [gux-text-field](../gux-text-field)
- [gux-list](../gux-list)

### Graph
```mermaid
graph TD;
  gux-command-palette --> gux-text-field
  gux-command-palette --> gux-list
  style gux-command-palette fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
