# gux-notification-toast-legacy

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description           | Type                                              | Default     |
| -------- | --------- | --------------------- | ------------------------------------------------- | ----------- |
| `accent` | `accent`  | The component accent. | `"alert" \| "neutral" \| "positive" \| "warning"` | `'neutral'` |


## Events

| Event        | Description | Type                |
| ------------ | ----------- | ------------------- |
| `guxdismiss` |             | `CustomEvent<void>` |


## Slots

| Slot        | Description                                      |
| ----------- | ------------------------------------------------ |
| `"icon"`    | Required slot for gux-icon                       |
| `"message"` | Required slot for the notification toast message |
| `"title"`   | Required slot for the notification toast title   |


## Dependencies

### Depends on

- [gux-truncate](../../stable/gux-truncate)
- [gux-dismiss-button](../../stable/gux-dismiss-button)

### Graph
```mermaid
graph TD;
  gux-notification-toast-legacy --> gux-truncate
  gux-notification-toast-legacy --> gux-dismiss-button
  gux-truncate --> gux-tooltip
  gux-dismiss-button --> gux-button-slot
  gux-dismiss-button --> gux-icon
  style gux-notification-toast-legacy fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
