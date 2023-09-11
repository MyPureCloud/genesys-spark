# gux-disclosure-button-legacy

This is a UI button component that is used to open or dismiss an associated panel.

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                   | Type                | Default     |
| ---------- | ---------- | --------------------------------------------- | ------------------- | ----------- |
| `isOpen`   | `is-open`  | Used to open or close the disclosure panel    | `boolean`           | `false`     |
| `label`    | `label`    | Indicates the label for the disclosure button | `string`            | `undefined` |
| `position` | `position` | Indicates the position of the button panel    | `"left" \| "right"` | `'left'`    |


## Events

| Event    | Description                                              | Type                   |
| -------- | -------------------------------------------------------- | ---------------------- |
| `active` | Return the state of the components panel on state change | `CustomEvent<boolean>` |


## Slots

| Slot              | Description               |
| ----------------- | ------------------------- |
| `"panel-content"` | Slot for content of panel |


## Dependencies

### Depends on

- [gux-icon](../../stable/gux-icon)

### Graph
```mermaid
graph TD;
  gux-disclosure-button-legacy --> gux-icon
  style gux-disclosure-button-legacy fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
