# gux-column-manager



<!-- Auto Generated Below -->


## Events

| Event            | Description | Type                    |
| ---------------- | ----------- | ----------------------- |
| `guxorderchange` |             | `CustomEvent<string[]>` |


## Slots

| Slot | Description                        |
| ---- | ---------------------------------- |
|      | slot for gux-column-manager-item's |


## CSS Custom Properties

| Name                                                           | Description |
| -------------------------------------------------------------- | ----------- |
| `--gse-ui-dataTableItems-editColumn-editColumnContent-gap`     |             |
| `--gse-ui-dataTableItems-editColumn-editColumnContent-padding` |             |


## Dependencies

### Depends on

- [gux-content-search](../gux-content-search)
- [gux-form-field-checkbox](../gux-form-field/components/gux-form-field-checkbox)
- [gux-announce-beta](../../beta/gux-announce)

### Graph
```mermaid
graph TD;
  gux-column-manager --> gux-content-search
  gux-column-manager --> gux-form-field-checkbox
  gux-column-manager --> gux-announce-beta
  gux-content-search --> gux-icon
  gux-form-field-checkbox --> gux-icon
  style gux-column-manager fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
