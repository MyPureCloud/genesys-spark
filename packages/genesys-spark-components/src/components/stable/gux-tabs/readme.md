# gux-tabs



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                          | Type                                | Default        |
| ------------- | ------------- | ---------------------------------------------------- | ----------------------------------- | -------------- |
| `activeTab`   | `active-tab`  | tabId of the currently selected tab                  | `string`                            | `undefined`    |
| `alignment`   | `alignment`   | Specifies left aligned, centered, or full width tabs | `"center" \| "fullWidth" \| "left"` | `'left'`       |
| `orientation` | `orientation` | Specifies horizontal or vertical orientation of tabs | `"horizontal" \| "vertical"`        | `'horizontal'` |


## Events

| Event                | Description                           | Type                  |
| -------------------- | ------------------------------------- | --------------------- |
| `guxactivetabchange` | Triggers when the active tab changes. | `CustomEvent<string>` |


## Methods

### `guxActivate(tabId: string) => Promise<void>`



#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `tabId` | `string` |             |

#### Returns

Type: `Promise<void>`




## Slots

| Slot         | Description                          |
| ------------ | ------------------------------------ |
|              | collection of gux-tab-panel elements |
| `"tab-list"` | Slot for gux-tab-list                |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
