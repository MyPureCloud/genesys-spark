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

 - [gux-rich-text-editor-action](../../beta/gux-rich-text-editor/gux-rich-text-editor-action)

### Graph
```mermaid
graph TD;
  gux-rich-text-editor-action --> gux-button
  style gux-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
