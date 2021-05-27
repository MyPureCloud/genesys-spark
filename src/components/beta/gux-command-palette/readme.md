# gux-command-palette
A command palette. This control is used to display possible commands and allows for those commands to be triggered.

## Example
```xml
  <head>
    <script type="text/javascript">
      function openCommandPalette() {
        document.getElementById('palette').open();
      }
    </script>
  </head>
  <body onload="openCommandPalette()">
    <gux-command-palette id="palette">
      <gux-command-action text="test" details="shows an alert" shortcut="⌘ T"></gux-command-action>
      <gux-command-action text="test2" details="Does a thing" shortcut="⌥ T"></gux-command-action>
      <gux-command-action text="test3" shortcut="⌃ T"></gux-command-action>
      <gux-command-action text="apple" details="a fruit" common></gux-command-action>
      <gux-command-action text="banana" recent></gux-command-action>
    </gux-command-palette>
  </body>
```

<!-- Auto Generated Below -->


## Methods

### `close() => Promise<void>`

Closes the command palette.

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Opens the command palette.

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [gux-form-field](../../stable/gux-form-field)
- [gux-list](../../stable/gux-list)
- [gux-list-item](../../stable/gux-list/list-item)
- [gux-text-highlight](../../stable/gux-text-highlight)

### Graph
```mermaid
graph TD;
  gux-command-palette-beta --> gux-form-field
  gux-command-palette-beta --> gux-list
  gux-command-palette-beta --> gux-list-item
  gux-command-palette-beta --> gux-text-highlight
  gux-form-field --> gux-input-checkbox
  gux-form-field --> gux-input-radio
  gux-form-field --> gux-input-color
  gux-form-field --> gux-input-range
  gux-form-field --> gux-input-number
  gux-form-field --> gux-input-select
  gux-form-field --> gux-input-text-like
  gux-form-field --> gux-input-search
  gux-form-field --> gux-input-textarea
  gux-input-color --> gux-icon
  gux-input-color --> gux-color-select
  gux-color-select --> gux-input-color-option
  gux-input-number --> gux-icon
  gux-input-select --> gux-icon
  gux-input-text-like --> gux-icon
  gux-input-search --> gux-icon
  gux-list-item --> gux-text-highlight
  style gux-command-palette-beta fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
