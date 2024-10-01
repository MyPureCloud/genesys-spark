# gux-button

This custom component is a simple button having some styling on it.
You can choose between two type (secondary and primary).

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                               | Type                                                                        | Default       |
| ---------- | ----------- | ----------------------------------------- | --------------------------------------------------------------------------- | ------------- |
| `accent`   | `accent`    |                                           | `"danger" \| "ghost" \| "inline" \| "primary" \| "secondary" \| "tertiary"` | `'secondary'` |
| `disabled` | `disabled`  | Indicate if the button is disabled or not | `boolean`                                                                   | `false`       |
| `guxTitle` | `gux-title` | The component title                       | `string`                                                                    | `undefined`   |
| `type`     | `type`      | The component button type                 | `"button" \| "reset" \| "submit"`                                           | `'button'`    |


## Slots

| Slot | Description |
| ---- | ----------- |
|      | content     |


## Dependencies

### Used by

 - [gux-pagination-ellipsis-button](../gux-pagination/gux-pagination-buttons/gux-pagination-ellipsis-button)

### Graph
```mermaid
graph TD;
  gux-pagination-ellipsis-button --> gux-button
  style gux-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
