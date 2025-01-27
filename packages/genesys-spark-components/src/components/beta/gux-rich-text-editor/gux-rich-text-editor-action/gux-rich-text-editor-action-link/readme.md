# gux-rich-text-editor-action-link



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description | Type      | Default |
| ---------- | ----------- | ----------- | --------- | ------- |
| `disabled` | `disabled`  |             | `boolean` | `false` |
| `isActive` | `is-active` |             | `boolean` | `false` |


## Events

| Event         | Description | Type                                                    |
| ------------- | ----------- | ------------------------------------------------------- |
| `linkOptions` |             | `CustomEvent<{ textToDisplay: string; href: string; }>` |


## Dependencies

### Depends on

- [gux-tooltip](../../../../stable/gux-tooltip)
- [gux-button-slot](../../../../stable/gux-button-slot)
- [gux-icon](../../../../stable/gux-icon)
- [gux-popover](../../../../stable/gux-popover)
- [gux-form-field-text-like](../../../../stable/gux-form-field/components/gux-form-field-text-like)
- [gux-cta-group](../../../gux-cta-group)
- [gux-button](../../../../stable/gux-button)

### Graph
```mermaid
graph TD;
  gux-rich-text-editor-action-link --> gux-tooltip
  gux-rich-text-editor-action-link --> gux-button-slot
  gux-rich-text-editor-action-link --> gux-icon
  gux-rich-text-editor-action-link --> gux-popover
  gux-rich-text-editor-action-link --> gux-form-field-text-like
  gux-rich-text-editor-action-link --> gux-cta-group
  gux-rich-text-editor-action-link --> gux-button
  gux-popover --> gux-dismiss-button
  gux-dismiss-button --> gux-button-slot
  gux-dismiss-button --> gux-icon
  gux-form-field-text-like --> gux-radial-loading
  gux-form-field-text-like --> gux-form-field-label-indicator
  gux-form-field-text-like --> gux-form-field-input-clear-button
  gux-form-field-text-like --> gux-icon
  gux-form-field-input-clear-button --> gux-icon
  gux-button --> gux-tooltip-beta
  gux-tooltip-beta --> gux-tooltip-base-beta
  style gux-rich-text-editor-action-link fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
