# gux-tab-advanced-list



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute             | Description                     | Type      | Default    |
| ------------------ | --------------------- | ------------------------------- | --------- | ---------- |
| `allowSort`        | `allow-sort`          | Enable tab sorting by drag/drop | `boolean` | `true`     |
| `showNewTabButton` | `show-new-tab-button` | Enable new tab button           | `boolean` | `true`     |
| `tabLimit`         | `tab-limit`           | Maximum nuber of tabs created   | `number`  | `Infinity` |


## Events

| Event         | Description                                       | Type                    |
| ------------- | ------------------------------------------------- | ----------------------- |
| `newTab`      | Triggers when the new tab button is selected.     | `CustomEvent<any>`      |
| `sortChanged` | Triggers when the sorting of the tabs is changed. | `CustomEvent<string[]>` |


## Methods

### `guxSetActive(activeTab: string) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [gux-button-slot](../../gux-button-slot)
- [gux-icon](../../gux-icon)

### Graph
```mermaid
graph TD;
  gux-tab-advanced-list --> gux-button-slot
  gux-tab-advanced-list --> gux-icon
  style gux-tab-advanced-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
