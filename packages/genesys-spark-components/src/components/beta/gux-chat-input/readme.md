# gux-chat-input


<!-- Auto Generated Below -->


## Events

| Event               | Description                                                                  | Type               |
| ------------------- | ---------------------------------------------------------------------------- | ------------------ |
| `onchatinputsubmit` | Triggers when the CTA button is clicked to initiate Copilot text processing. | `CustomEvent<any>` |


## Methods

### `guxReset() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot                | Description                   |
| ------------------- | ----------------------------- |
| `"caution-message"` | slot for caution message text |


## Dependencies

### Depends on

- [gux-button-slot](../../stable/gux-button-slot)
- [gux-icon](../../stable/gux-icon)

### Graph
```mermaid
graph TD;
  gux-chat-input --> gux-button-slot
  gux-chat-input --> gux-icon
  style gux-chat-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
