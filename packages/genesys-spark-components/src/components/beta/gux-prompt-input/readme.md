# gux-prompt-input-beta



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type     | Default     |
| ------------- | ------------- | ----------- | -------- | ----------- |
| `placeholder` | `placeholder` |             | `string` | `undefined` |


## Events

| Event                   | Description                                                                                      | Type                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `onpromptinputgenerate` | Triggers when the generate button is clicked to either initiate or stop Copilot text generation. | `CustomEvent<{ inputText: string; isGenerating: boolean; }>` |


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
  gux-prompt-input-beta --> gux-button-slot
  gux-prompt-input-beta --> gux-icon
  style gux-prompt-input-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
