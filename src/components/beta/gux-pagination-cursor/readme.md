# gux-pagination-cursor-beta



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type      | Default |
| ------------- | -------------- | ----------- | --------- | ------- |
| `hasNext`     | `has-next`     |             | `boolean` | `false` |
| `hasPrevious` | `has-previous` |             | `boolean` | `false` |


## Events

| Event                       | Description | Type                                |
| --------------------------- | ----------- | ----------------------------------- |
| `guxPaginationCursorchange` |             | `CustomEvent<"next" \| "previous">` |


## Dependencies

### Depends on

- [gux-button-slot-beta](../gux-button-slot)
- [gux-icon](../../stable/gux-icon)

### Graph
```mermaid
graph TD;
  gux-pagination-cursor-beta --> gux-button-slot-beta
  gux-pagination-cursor-beta --> gux-icon
  style gux-pagination-cursor-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
