# gux-side-panel-header-mini



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type      | Default |
| -------- | --------- | ----------- | --------- | ------- |
| `expand` | `expand`  |             | `boolean` | `false` |


## Events

| Event              | Description | Type                |
| ------------------ | ----------- | ------------------- |
| `sidePanelDismiss` |             | `CustomEvent<void>` |


## Slots

| Slot | Description                      |
| ---- | -------------------------------- |
|      | Text content for the mini header |


## Dependencies

### Depends on

- [gux-icon](../../../../stable/gux-icon)
- [gux-dismiss-button](../../../../stable/gux-dismiss-button)

### Graph
```mermaid
graph TD;
  gux-side-panel-header-mini --> gux-icon
  gux-side-panel-header-mini --> gux-dismiss-button
  gux-dismiss-button --> gux-button-slot
  gux-dismiss-button --> gux-icon
  style gux-side-panel-header-mini fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
