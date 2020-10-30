# gux-input



<!-- Auto Generated Below -->


## Slots

| Slot      | Description                 |
| --------- | --------------------------- |
| `"input"` | Required slot for input tag |
| `"label"` | Required slot for label tag |


## Dependencies

### Depends on

- [gux-input-checkbox-beta](./components/gux-input-checkbox-beta)
- [gux-input-radio-beta](./components/gux-input-radio-beta)
- [gux-input-color-beta](./components/gux-input-color-beta)
- [gux-input-range-beta](./components/gux-input-range-beta)
- [gux-input-text-like-beta](./components/gux-input-text-like-beta)

### Graph
```mermaid
graph TD;
  gux-form-field-beta --> gux-input-checkbox-beta
  gux-form-field-beta --> gux-input-radio-beta
  gux-form-field-beta --> gux-input-color-beta
  gux-form-field-beta --> gux-input-range-beta
  gux-form-field-beta --> gux-input-text-like-beta
  gux-input-color-beta --> gux-icon
  gux-input-color-beta --> gux-input-color-select-beta
  gux-input-color-select-beta --> gux-input-color-option-beta
  style gux-form-field-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
