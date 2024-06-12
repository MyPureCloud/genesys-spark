# gux-selector-card



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                        | Default    |
| --------- | --------- | ----------- | --------------------------- | ---------- |
| `variant` | `variant` |             | `"descriptive" \| "simple"` | `'simple'` |


## Slots

| Slot            | Description                                   |
| --------------- | --------------------------------------------- |
| `"badge"`       | Optional slot for badge                       |
| `"description"` | Optional slot for additional text description |
| `"icon"`        | Required slot for icon                        |
| `"input"`       | Required slot for input tag                   |
| `"label"`       | Required slot for label tag                   |


## Dependencies

### Depends on

- [gux-truncate](../../../stable/gux-truncate)

### Graph
```mermaid
graph TD;
  gux-selector-card-beta --> gux-truncate
  gux-truncate --> gux-tooltip
  style gux-selector-card-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
