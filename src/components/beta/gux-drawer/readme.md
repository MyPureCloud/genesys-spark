# gux-drawer-beta



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type      | Default |
| -------- | --------- | ----------- | --------- | ------- |
| `open`   | `open`    |             | `boolean` | `false` |


## Methods

### `showModal() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description                          |
| ----------- | ------------------------------------ |
| `"content"` | Required slot for the modal content  |
| `"title"`   | Optional slot to set the modal title |


## Dependencies

### Depends on

- [gux-dismiss-button](../../stable/gux-dismiss-button)

### Graph
```mermaid
graph TD;
  gux-drawer-beta --> gux-dismiss-button
  gux-dismiss-button --> gux-icon
  style gux-drawer-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
