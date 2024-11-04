# gux-avatar-group-beta



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type     | Default |
| ------------- | -------------- | ----------- | -------- | ------- |
| `avatarLimit` | `avatar-limit` |             | `number` | `7`     |


## Dependencies

### Depends on

- [gux-avatar-list-item-beta](gux-avatar-list-item)
- [gux-avatar-beta](../gux-avatar)
- [gux-avatar-overflow-beta](gux-avatar-overflow)

### Graph
```mermaid
graph TD;
  gux-avatar-group-beta --> gux-avatar-list-item-beta
  gux-avatar-group-beta --> gux-avatar-beta
  gux-avatar-group-beta --> gux-avatar-overflow-beta
  gux-avatar-beta --> gux-icon
  gux-avatar-beta --> gux-screen-reader-beta
  gux-avatar-beta --> gux-tooltip-beta
  gux-tooltip-beta --> gux-tooltip-base-beta
  gux-avatar-overflow-beta --> gux-popup
  gux-avatar-overflow-beta --> gux-list
  style gux-avatar-group-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
