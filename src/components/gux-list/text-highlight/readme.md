# gux-text-highlight
Displays highlightable text.


<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                             | Type     | Default                   |
| ----------- | ----------- | --------------------------------------- | -------- | ------------------------- |
| `highlight` | `highlight` | The text to highlight.                  | `string` | `undefined`               |
| `strategy`  | `strategy`  | The way the text should be highlighted. | `string` | `HighlightStrategy.Start` |
| `text`      | `text`      | The value to display.                   | `string` | `undefined`               |


## Dependencies

### Used by

 - [gux-command-palette](../../gux-command-palette)
 - [gux-list-item](../list-item)

### Graph
```mermaid
graph TD;
  gux-command-palette --> gux-text-highlight
  gux-list-item --> gux-text-highlight
  style gux-text-highlight fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
