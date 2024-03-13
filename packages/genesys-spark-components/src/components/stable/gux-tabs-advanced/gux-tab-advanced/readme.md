# gux-tab-advanced



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description           | Type      | Default     |
| ------------- | -------------- | --------------------- | --------- | ----------- |
| `guxDisabled` | `gux-disabled` |                       | `boolean` | `false`     |
| `tabId`       | `tab-id`       | unique id for the tab | `string`  | `undefined` |


## Events

| Event                      | Description | Type                  |
| -------------------------- | ----------- | --------------------- |
| `internalactivatetabpanel` |             | `CustomEvent<string>` |


## Methods

### `guxFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `guxGetActive() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`



### `guxSetActive(active: boolean) => Promise<void>`



#### Parameters

| Name     | Type      | Description |
| -------- | --------- | ----------- |
| `active` | `boolean` |             |

#### Returns

Type: `Promise<void>`




## Slots

| Slot                 | Description                                                                             |
| -------------------- | --------------------------------------------------------------------------------------- |
| `"default"`          | gux-icon (optional) and text node (required)                                            |
| `"dropdown-options"` | optional slot for tab options, must slot a gux-list element with gux-list-item children |


## Dependencies

### Depends on

- [gux-button-slot](../../gux-button-slot)
- [gux-icon](../../gux-icon)
- [gux-popover-list](../../gux-popover-list)
- [gux-tooltip-title](../../gux-tooltip-title)

### Graph
```mermaid
graph TD;
  gux-tab-advanced --> gux-button-slot
  gux-tab-advanced --> gux-icon
  gux-tab-advanced --> gux-popover-list
  gux-tab-advanced --> gux-tooltip-title
  gux-popover-list --> gux-dismiss-button
  gux-dismiss-button --> gux-button-slot
  gux-dismiss-button --> gux-icon
  gux-tooltip-title --> gux-tooltip
  style gux-tab-advanced fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
