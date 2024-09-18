# gux-toast



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type                                                      | Default     |
| ----------- | ------------ | ----------- | --------------------------------------------------------- | ----------- |
| `toastType` | `toast-type` |             | `"action" \| "error" \| "info" \| "success" \| "warning"` | `'success'` |


## Events

| Event        | Description | Type                |
| ------------ | ----------- | ------------------- |
| `guxdismiss` |             | `CustomEvent<void>` |


## Slots

| Slot                 | Description                                                       |
| -------------------- | ----------------------------------------------------------------- |
| `"icon"`             | Required slot for toast type of action                            |
| `"link"`             | Optional slot for a link in any toast except toast type of action |
| `"message"`          | Required slot for the toast message                               |
| `"primary-button"`   | Required slot for primary action button in an action toast        |
| `"secondary-button"` | Optional slot for secondary action button in an action toast      |
| `"title"`            | Optional slot for the toast title                                 |


## Dependencies

### Depends on

- [gux-icon](../gux-icon)
- [gux-cta-group](../../beta/gux-cta-group)
- [gux-button-slot](../gux-button-slot)
- [gux-truncate](../gux-truncate)
- [gux-dismiss-button](../gux-dismiss-button)

### Graph
```mermaid
graph TD;
  gux-toast --> gux-icon
  gux-toast --> gux-cta-group
  gux-toast --> gux-button-slot
  gux-toast --> gux-truncate
  gux-toast --> gux-dismiss-button
  gux-truncate --> gux-tooltip
  gux-dismiss-button --> gux-button-slot
  gux-dismiss-button --> gux-icon
  style gux-toast fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
