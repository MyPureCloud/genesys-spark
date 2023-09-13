# gux-column-manager-item



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute  | Description | Type     | Default     |
| --------- | ---------- | ----------- | -------- | ----------- |
| `orderId` | `order-id` |             | `string` | `undefined` |


## Events

| Event                              | Description | Type                                                   |
| ---------------------------------- | ----------- | ------------------------------------------------------ |
| `internal_keyboard_reorder_emit`   |             | `CustomEvent<void>`                                    |
| `internal_keyboard_reorder_finish` |             | `CustomEvent<void>`                                    |
| `internal_keyboard_reorder_move`   |             | `CustomEvent<{ delta: number; column: string; }>`      |
| `internal_keyboard_reorder_start`  |             | `CustomEvent<string>`                                  |
| `internal_order_change`            |             | `CustomEvent<{ oldIndex: number; newIndex: number; }>` |


## Methods

### `guxFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `guxSetHighlight(highlight?: string, highlightActive?: boolean) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description                      |
| ---- | -------------------------------- |
|      | slot for gux-form-field-checkbox |


## Dependencies

### Depends on

- [gux-icon](../../gux-icon)
- [gux-text-highlight](../../gux-text-highlight)

### Graph
```mermaid
graph TD;
  gux-column-manager-item --> gux-icon
  gux-column-manager-item --> gux-text-highlight
  style gux-column-manager-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
