# gux-pagination-cursor



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

- [gux-button-slot-beta](../../beta/gux-button-slot)
- [gux-icon](../gux-icon)

### Graph
```mermaid
graph TD;
  gux-pagination-cursor --> gux-button-slot-beta
  gux-pagination-cursor --> gux-icon
  style gux-pagination-cursor fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
