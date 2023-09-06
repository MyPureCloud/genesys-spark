# gux-tabs-beta



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                               | Type                                | Default        |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | -------------- |
| `activeTab`   | `active-tab`  | tabId of the currently selected tab                                                                                       | `string`                            | `undefined`    |
| `alignment`   | `alignment`   | Specifies left aligned, centered, or full width tabs                                                                      | `"center" \| "fullWidth" \| "left"` | `'left'`       |
| `orientation` | `orientation` | Specifies horizontal or vertical orientation of tabs                                                                      | `"horizontal" \| "vertical"`        | `'horizontal'` |
| `useFlexbox`  | `use-flexbox` | Use flexbox for positioning. Allows panels to fill height of tabs. Will remove this prop and use flexbox as default in V4 | `boolean`                           | `false`        |


## Events

| Event                | Description                           | Type                  |
| -------------------- | ------------------------------------- | --------------------- |
| `guxactivetabchange` | Triggers when the active tab changes. | `CustomEvent<string>` |


## Methods

### `guxActivate(tabId: string) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot         | Description                          |
| ------------ | ------------------------------------ |
|              | collection of gux-tab-panel elements |
| `"tab-list"` | Slot for gux-tab-list                |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
