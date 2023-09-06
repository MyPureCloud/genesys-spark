# gux-table-toolbar-action



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description | Type                                                                 | Default       |
| ---------- | ----------- | ----------- | -------------------------------------------------------------------- | ------------- |
| `accent`   | `accent`    |             | `"ghost" \| "primary" \| "secondary"`                                | `'secondary'` |
| `action`   | `action`    |             | `"add" \| "delete" \| "export" \| "import" \| "refresh" \| "revert"` | `undefined`   |
| `disabled` | `disabled`  |             | `boolean`                                                            | `false`       |
| `iconOnly` | `icon-only` |             | `boolean`                                                            | `false`       |


## Dependencies

### Depends on

- [gux-table-toolbar-custom-action](../gux-table-toolbar-custom-action)
- [gux-icon](../../gux-icon)

### Graph
```mermaid
graph TD;
  gux-table-toolbar-action --> gux-table-toolbar-custom-action
  gux-table-toolbar-action --> gux-icon
  gux-table-toolbar-custom-action --> gux-tooltip
  gux-table-toolbar-custom-action --> gux-button-slot-beta
  style gux-table-toolbar-action fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
