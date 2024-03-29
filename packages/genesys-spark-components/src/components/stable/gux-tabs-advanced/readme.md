# gux-tabs-advanced



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                         | Type     | Default     |
| ----------- | ------------ | ----------------------------------- | -------- | ----------- |
| `activeTab` | `active-tab` | tabId of the currently selected tab | `string` | `undefined` |


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

| Slot         | Description                                   |
| ------------ | --------------------------------------------- |
|              | collection of gux-tab-advanced-panel elements |
| `"tab-list"` | Slot for gux-tab-advanced-list element        |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
