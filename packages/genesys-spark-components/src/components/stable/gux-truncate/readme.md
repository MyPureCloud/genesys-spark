# gux-truncate



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                     | Type     | Default     |
| ---------- | ----------- | ------------------------------- | -------- | ----------- |
| `maxLines` | `max-lines` | Lines to wrap before truncating | `number` | `undefined` |


## Methods

### `setHideTooltip() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setShowTooltip() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description                                      |
| ---- | ------------------------------------------------ |
|      | text node or element containing text to truncate |


## Dependencies

### Used by

 - [gux-dropdown](../gux-dropdown)
 - [gux-file-list-item](../gux-form-field/components/gux-form-field-file-beta/components/gux-file-list-item)
 - [gux-notification-toast-legacy](../../legacy/gux-notification-toast-legacy)
 - [gux-option](../gux-listbox/options/gux-option)
 - [gux-option-icon](../gux-listbox/options/gux-option-icon)
 - [gux-option-multi](../gux-listbox-multi/gux-option-multi)
 - [gux-rich-text-editor-action-rich-style](../../beta/gux-rich-text-editor/gux-rich-text-editor-action/gux-rich-text-editor-action-rich-style)
 - [gux-rich-text-editor-action-text-highlight](../../beta/gux-rich-text-editor/gux-rich-text-editor-action/gux-rich-text-editor-action-text-highlight)
 - [gux-side-panel-heading](../../beta/gux-side-panel/components/gux-side-panel-heading)
 - [gux-simple-toast-legacy](../../legacy/gux-simple-toast-legacy)
 - [gux-toast](../gux-toast)

### Depends on

- [gux-tooltip](../gux-tooltip)

### Graph
```mermaid
graph TD;
  gux-truncate --> gux-tooltip
  gux-dropdown --> gux-truncate
  gux-file-list-item --> gux-truncate
  gux-notification-toast-legacy --> gux-truncate
  gux-option --> gux-truncate
  gux-option-icon --> gux-truncate
  gux-option-multi --> gux-truncate
  gux-rich-text-editor-action-rich-style --> gux-truncate
  gux-rich-text-editor-action-text-highlight --> gux-truncate
  gux-side-panel-heading --> gux-truncate
  gux-simple-toast-legacy --> gux-truncate
  gux-toast --> gux-truncate
  style gux-truncate fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
