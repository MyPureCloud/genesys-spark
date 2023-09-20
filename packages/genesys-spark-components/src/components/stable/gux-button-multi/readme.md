# gux-buttom-multi

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                         | Type                                     | Default       |
| ---------- | ---------- | ----------------------------------- | ---------------------------------------- | ------------- |
| `accent`   | `accent`   |                                     | `"primary" \| "secondary" \| "tertiary"` | `'secondary'` |
| `disabled` | `disabled` | Disables the action button.         | `boolean`                                | `false`       |
| `isOpen`   | `is-open`  | It is used to open or not the list. | `boolean`                                | `false`       |


## Events

| Event   | Description                      | Type               |
| ------- | -------------------------------- | ------------------ |
| `close` | Triggered when the menu is close | `CustomEvent<any>` |
| `open`  | Triggered when the menu is open  | `CustomEvent<any>` |


## Slots

| Slot      | Description                   |
| --------- | ----------------------------- |
| `"title"` | slot for icon and button text |


## Dependencies

### Depends on

- [gux-popup](../gux-popup)
- [gux-button-slot](../gux-button-slot)
- [gux-icon](../gux-icon)
- [gux-list](../gux-list)

### Graph
```mermaid
graph TD;
  gux-button-multi --> gux-popup
  gux-button-multi --> gux-button-slot
  gux-button-multi --> gux-icon
  gux-button-multi --> gux-list
  style gux-button-multi fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
