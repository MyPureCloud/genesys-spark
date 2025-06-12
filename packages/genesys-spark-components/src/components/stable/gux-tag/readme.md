# gux-tag



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description | Type                                                                                            | Default     |
| ----------- | ----------- | ----------- | ----------------------------------------------------------------------------------------------- | ----------- |
| `accent`    | `accent`    |             | `"1" \| "10" \| "2" \| "3" \| "4" \| "5" \| "6" \| "7" \| "8" \| "9" \| "default" \| "inherit"` | `'default'` |
| `disabled`  | `disabled`  |             | `boolean`                                                                                       | `false`     |
| `emphasis`  | `emphasis`  |             | `"bold" \| "subtle"`                                                                            | `'bold'`    |
| `removable` | `removable` |             | `boolean`                                                                                       | `false`     |
| `size`      | `size`      |             | `"large" \| "small"`                                                                            | `'small'`   |


## Events

| Event       | Description | Type                  |
| ----------- | ----------- | --------------------- |
| `guxdelete` |             | `CustomEvent<string>` |


## Slots

| Slot | Description |
| ---- | ----------- |
|      | content     |


## Dependencies

### Depends on

- [gux-tooltip-title](../gux-tooltip-title)
- [gux-icon](../gux-icon)
- [gux-screen-reader-beta](../../beta/gux-screen-reader)

### Graph
```mermaid
graph TD;
  gux-tag --> gux-tooltip-title
  gux-tag --> gux-icon
  gux-tag --> gux-screen-reader-beta
  gux-tooltip-title --> gux-tooltip
  style gux-tag fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
