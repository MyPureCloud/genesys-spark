# gux-table-select-menu



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description | Type      | Default |
| ------------------ | ------------------- | ----------- | --------- | ------- |
| `dropdownDisabled` | `dropdown-disabled` |             | `boolean` | `false` |


## Slots

| Slot                    | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `"default"`             | Required slot for gux-all-row-select element                 |
| `"select-menu-options"` | Optional slot for gux-list containing gux-list-item children |


## Dependencies

### Depends on

- [gux-icon](../../gux-icon)
- [gux-popover-list](../../gux-popover-list)

### Graph
```mermaid
graph TD;
  gux-table-select-menu --> gux-icon
  gux-table-select-menu --> gux-popover-list
  gux-popover-list --> gux-dismiss-button
  gux-dismiss-button --> gux-button-slot
  gux-dismiss-button --> gux-icon
  style gux-table-select-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
