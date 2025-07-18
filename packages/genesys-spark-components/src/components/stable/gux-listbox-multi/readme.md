# gux-listbox-multi

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description | Type                                  | Default     |
| --------------- | ----------------- | ----------- | ------------------------------------- | ----------- |
| `disabled`      | `disabled`        |             | `boolean`                             | `false`     |
| `emptyMessage`  | `empty-message`   |             | `string`                              | `undefined` |
| `filter`        | `filter`          |             | `string`                              | `''`        |
| `filterType`    | `filter-type`     |             | `"custom" \| "none" \| "starts-with"` | `'none'`    |
| `hasExactMatch` | `has-exact-match` |             | `boolean`                             | `false`     |
| `loading`       | `loading`         |             | `boolean`                             | `false`     |
| `textInput`     | `text-input`      |             | `string`                              | `''`        |
| `value`         | `value`           |             | `string`                              | `undefined` |


## Events

| Event                           | Description | Type               |
| ------------------------------- | ----------- | ------------------ |
| `internallistboxoptionsupdated` |             | `CustomEvent<any>` |


## Methods

### `guxSelectActive() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description                                                         |
| ---- | ------------------------------------------------------------------- |
|      | collection of gux-option-multi elements and gux-select-all element. |


## Dependencies

### Depends on

- [gux-radial-loading](../gux-radial-loading)

### Graph
```mermaid
graph TD;
  gux-listbox-multi --> gux-radial-loading
  style gux-listbox-multi fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
