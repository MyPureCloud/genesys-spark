# gux-tabs-list



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                | Type      | Default     |
| ------------- | -------------- | ------------------------------------------ | --------- | ----------- |
| `guxDisabled` | `gux-disabled` | Specifies if tab is disabled               | `boolean` | `false`     |
| `iconOnly`    | `icon-only`    | Specifies if the tab title is just an icon | `boolean` | `false`     |
| `tabId`       | `tab-id`       | Tab id for the tab                         | `string`  | `undefined` |


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



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [gux-tooltip-title](../../gux-tooltip-title)

### Graph
```mermaid
graph TD;
  gux-tab --> gux-tooltip-title
  style gux-tab fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
