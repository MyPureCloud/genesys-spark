# gux-avatar-group-beta



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type     | Default |
| ------------- | -------------- | ----------- | -------- | ------- |
| `avatarLimit` | `avatar-limit` |             | `number` | `7`     |


## Dependencies

### Depends on

- [gux-avatar-beta](../gux-avatar)
- [gux-list-item](../../stable/gux-list/gux-list-item)
- [gux-avatar-overflow-beta](gux-avatar-overflow)
- [gux-list](../../stable/gux-list)

### Graph
```mermaid
graph TD;
  gux-avatar-group-beta --> gux-avatar-beta
  gux-avatar-group-beta --> gux-list-item
  gux-avatar-group-beta --> gux-avatar-overflow-beta
  gux-avatar-group-beta --> gux-list
  gux-avatar-beta --> gux-icon
  gux-avatar-beta --> gux-screen-reader-beta
  gux-avatar-beta --> gux-tooltip-beta
  gux-tooltip-beta --> gux-tooltip-base-beta
  gux-avatar-overflow-beta --> gux-popup
  style gux-avatar-group-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
