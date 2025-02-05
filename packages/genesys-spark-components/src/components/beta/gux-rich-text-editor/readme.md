# gux-rich-text-editor-beta



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type      | Default |
| ---------- | ---------- | ----------- | --------- | ------- |
| `disabled` | `disabled` |             | `boolean` | `false` |


## Events

| Event             | Description | Type                  |
| ----------------- | ----------- | --------------------- |
| `guxToggleAction` |             | `CustomEvent<string>` |


## Slots

| Slot                       | Description                             |
| -------------------------- | --------------------------------------- |
| `"editor"`                 | Slot for the editor.                    |
| `"global-action"`          | Slot for global action.                 |
| `"inserting"`              | Slot for inserting actions.             |
| `"lists-indentation"`      | Slot for lists and indentation actions. |
| `"text-styling"`           | Slot for text-styling actions.          |
| `"typographical-emphasis"` | Slot for typographical actions.         |


## Dependencies

### Depends on

- [gux-rich-text-editor-action-rich-style](./gux-rich-text-editor-action/gux-rich-text-editor-action-rich-style)
- [gux-rich-style-list-item](./gux-rich-text-editor-list/gux-rich-style-list-item)
- [gux-rich-text-editor-sub-list](./gux-rich-text-editor-list/gux-rich-text-editor-sub-list)

### Graph
```mermaid
graph TD;
  gux-rich-text-editor-beta --> gux-rich-text-editor-action-rich-style
  gux-rich-text-editor-beta --> gux-rich-style-list-item
  gux-rich-text-editor-beta --> gux-rich-text-editor-sub-list
  gux-rich-text-editor-action-rich-style --> gux-icon
  gux-rich-text-editor-action-rich-style --> gux-truncate
  gux-rich-text-editor-action-rich-style --> gux-tooltip-beta
  gux-rich-text-editor-action-rich-style --> gux-rich-text-editor-list
  gux-rich-text-editor-action-rich-style --> gux-button-slot
  gux-rich-text-editor-action-rich-style --> gux-popup
  gux-truncate --> gux-tooltip
  gux-tooltip-beta --> gux-tooltip-base-beta
  gux-rich-text-editor-sub-list --> gux-icon
  style gux-rich-text-editor-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
