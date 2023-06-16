# gux-tag-beta



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description          | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Default     |
| ----------- | ----------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `color`     | `color`     | Tag background color | `"default" \| "default-subtle" \| "navy" \| "blue" \| "electric-purple" \| "aqua-green" \| "fuscha" \| "fuchsia" \| "dark-purple" \| "bubblegum-pink" \| "olive-green" \| "lilac" \| "alert-yellow-green" \| "blue-10" \| "blue-20" \| "blue-30" \| "blue-40" \| "blue-50" \| "blue-60" \| "blue-70" \| "blue-80" \| "blue-90" \| "blue-100" \| "alert-red-10" \| "alert-red-20" \| "alert-red-30" \| "alert-red-40" \| "alert-red-50" \| "alert-red-60" \| "alert-red-70" \| "alert-red-80" \| "alert-red-90" \| "alert-red-100" \| "alert-green-10" \| "alert-green-20" \| "alert-green-30" \| "alert-green-40" \| "alert-green-50" \| "alert-green-60" \| "alert-green-70" \| "alert-green-80" \| "alert-green-90" \| "alert-green-100" \| "alert-yellow-10" \| "alert-yellow-20" \| "alert-yellow-30" \| "alert-yellow-40" \| "alert-yellow-50" \| "alert-yellow-60" \| "alert-yellow-70" \| "alert-yellow-80" \| "alert-yellow-90" \| "alert-yellow-100" \| "brand-orange" \| "brand-teal" \| "brand-navy" \| "brand-light-blue" \| "brand-yellow"` | `'default'` |
| `disabled`  | `disabled`  | Tag is removable.    | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `false`     |
| `removable` | `removable` | Tag is removable.    | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `false`     |
| `value`     | `value`     | Index for remove tag | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `undefined` |


## Events

| Event       | Description                           | Type                  |
| ----------- | ------------------------------------- | --------------------- |
| `guxdelete` | Triggered when click on remove button | `CustomEvent<string>` |


## Slots

| Slot | Description |
| ---- | ----------- |
|      | content     |


## Dependencies

### Depends on

- [gux-tooltip-title](../../stable/gux-tooltip-title)
- [gux-icon](../../stable/gux-icon)

### Graph
```mermaid
graph TD;
  gux-tag-beta --> gux-tooltip-title
  gux-tag-beta --> gux-icon
  gux-tooltip-title --> gux-tooltip
  style gux-tag-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
