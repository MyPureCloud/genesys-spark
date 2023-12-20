# gux-popover-list

<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                | Description                                                                             | Type                                                                                                                                                                 | Default     |
| ---------------------- | ------------------------ | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `closeOnClickOutside`  | `close-on-click-outside` | Close popover when the user clicks outside of its bounds                                | `boolean`                                                                                                                                                            | `false`     |
| `displayDismissButton` | `display-dismiss-button` | Indicate if the dismiss button is displayed                                             | `boolean`                                                                                                                                                            | `undefined` |
| `for`                  | `for`                    | Indicates the id of the element the popover should anchor to                            | `string`                                                                                                                                                             | `undefined` |
| `isOpen`               | `is-open`                | Controls hiding and showing the popover                                                 | `boolean`                                                                                                                                                            | `false`     |
| `position`             | `position`               | Indicate position of popover element arrow (follow floating ui placement attribute api) | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom'`  |


## Events

| Event        | Description                             | Type                |
| ------------ | --------------------------------------- | ------------------- |
| `guxclose`   | Fired when the popover is close         | `CustomEvent<void>` |
| `guxdismiss` | Fired when a user dismisses the popover | `CustomEvent<void>` |
| `guxopen`    | Fired when the popover is open          | `CustomEvent<void>` |


## Slots

| Slot | Description     |
| ---- | --------------- |
|      | popover content |


## Dependencies

### Used by

 - [gux-tab-advanced](../gux-tabs-advanced/gux-tab-advanced)
 - [gux-table-select-menu](../gux-table/gux-table-select-menu)

### Depends on

- [gux-dismiss-button](../gux-dismiss-button)

### Graph
```mermaid
graph TD;
  gux-popover-list --> gux-dismiss-button
  gux-dismiss-button --> gux-button-slot
  gux-dismiss-button --> gux-icon
  gux-tab-advanced --> gux-popover-list
  gux-table-select-menu --> gux-popover-list
  style gux-popover-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
