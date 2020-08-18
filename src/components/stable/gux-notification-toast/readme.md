# gux-notification-toast

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

- [gux-icon](../gux-icon)

### Graph
```mermaid
graph TD;
  gux-notification-toast --> gux-icon
  style gux-notification-toast fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
