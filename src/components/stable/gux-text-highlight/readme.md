# gux-text-highlight



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                             | Type                               | Default     |
| ----------- | ----------- | --------------------------------------- | ---------------------------------- | ----------- |
| `highlight` | `highlight` | The text to highlight.                  | `string`                           | `undefined` |
| `strategy`  | `strategy`  | The way the text should be highlighted. | `"contains" \| "fuzzy" \| "start"` | `'start'`   |
| `text`      | `text`      | The value to display.                   | `string`                           | `undefined` |


## Dependencies

### Used by

 - [gux-command-palette-beta](../../beta/gux-command-palette)
 - [gux-list-item](../gux-list/list-item)

### Graph
```mermaid
graph TD;
  gux-command-palette-beta --> gux-text-highlight
  gux-list-item --> gux-text-highlight
  style gux-text-highlight fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
