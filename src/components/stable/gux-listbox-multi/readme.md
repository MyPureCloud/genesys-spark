# gux-listbox-multi

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description | Type      | Default     |
| --------------- | ----------------- | ----------- | --------- | ----------- |
| `filter`        | `filter`          |             | `string`  | `''`        |
| `hasExactMatch` | `has-exact-match` |             | `boolean` | `false`     |
| `loading`       | `loading`         |             | `boolean` | `false`     |
| `textInput`     | `text-input`      |             | `string`  | `''`        |
| `value`         | `value`           |             | `string`  | `undefined` |


## Events

| Event                           | Description | Type               |
| ------------------------------- | ----------- | ------------------ |
| `internallistboxoptionsupdated` |             | `CustomEvent<any>` |


## Methods

### `guxSelectActive() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description                             |
| ---- | --------------------------------------- |
|      | collection of gux-option-multi elements |


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
