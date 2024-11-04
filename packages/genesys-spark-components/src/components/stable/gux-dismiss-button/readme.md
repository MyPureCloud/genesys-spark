# gux-dismiss-button

This component is meant for use in other components as a dismiss button.

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type                      | Default      |
| ---------- | ---------- | ----------- | ------------------------- | ------------ |
| `position` | `position` |             | `"absolute" \| "inherit"` | `'absolute'` |
| `size`     | `size`     |             | `"medium" \| "small"`     | `'medium'`   |


## Dependencies

### Used by

 - [gux-modal](../gux-modal)
 - [gux-modal-legacy](../../legacy/gux-modal-legacy)
 - [gux-notification-toast-legacy](../../legacy/gux-notification-toast-legacy)
 - [gux-popover](../gux-popover)
 - [gux-popover-list](../gux-popover-list)
 - [gux-side-panel-beta](../../beta/gux-side-panel)
 - [gux-simple-toast-legacy](../../legacy/gux-simple-toast-legacy)
 - [gux-toast](../gux-toast)

### Depends on

- [gux-button-slot](../gux-button-slot)
- [gux-icon](../gux-icon)

### Graph
```mermaid
graph TD;
  gux-dismiss-button --> gux-button-slot
  gux-dismiss-button --> gux-icon
  gux-modal --> gux-dismiss-button
  gux-modal-legacy --> gux-dismiss-button
  gux-notification-toast-legacy --> gux-dismiss-button
  gux-popover --> gux-dismiss-button
  gux-popover-list --> gux-dismiss-button
  gux-side-panel-beta --> gux-dismiss-button
  gux-simple-toast-legacy --> gux-dismiss-button
  gux-toast --> gux-dismiss-button
  style gux-dismiss-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
