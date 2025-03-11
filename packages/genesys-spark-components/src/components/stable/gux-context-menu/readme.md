# gux-context-menu

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                    | Type                                                                                                                                                                 | Default          |
| ------------------ | ------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `compact`          | `compact`           | Indicates button density style. Intended to be paired with gux-table property. | `boolean`                                                                                                                                                            | `false`          |
| `disabled`         | `disabled`          | Controls the disabled state of the internal button                             | `boolean`                                                                                                                                                            | `false`          |
| `placement`        | `placement`         | Placement of the popup defaults to is "bottom-start"                           | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom-start'` |
| `screenreaderText` | `screenreader-text` | Screenreader text for context menu button defaults to "context menu"           | `string`                                                                                                                                                             | `''`             |


## Dependencies

### Depends on

- [gux-popup](../gux-popup)
- [gux-button-slot](../gux-button-slot)
- [gux-icon](../gux-icon)
- [gux-list](../gux-list)

### Graph
```mermaid
graph TD;
  gux-context-menu --> gux-popup
  gux-context-menu --> gux-button-slot
  gux-context-menu --> gux-icon
  gux-context-menu --> gux-list
  style gux-context-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
