# gux-list-legacy

A list element. In order to use this element list contents must be slotted in.

Example usage

```html
<gux-list-legacy>
  <gux-list-item-legacy value="test" text="test1" />
  <gux-list-divider-legacy />
  <gux-list-item-legacy value="test" text="test2" />
  <gux-list-ite-legacym value="test" text="test3" />
</gux-list-legacy>
```

Example with slotting

```html
<gux-list-legacy>
  <gux-list-item-legacy
    ><span>⌘</span><gux-text-highlight text="test"
  /></gux-list-item-legacy>
</gux-list-legacy>
```

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                        | Type      | Default     |
| ----------- | ----------- | ---------------------------------- | --------- | ----------- |
| `highlight` | `highlight` | The highlight value                | `string`  | `undefined` |
| `value`     | --          | The current selection in the list. | `unknown` | `undefined` |


## Events

| Event     | Description                                     | Type                   |
| --------- | ----------------------------------------------- | ---------------------- |
| `changed` | Triggered when the list's selection is changed. | `CustomEvent<unknown>` |


## Methods

### `isFirstItemSelected() => Promise<boolean>`

Returns whether the first item in the list is selected.

#### Returns

Type: `Promise<boolean>`



### `isLastItemSelected() => Promise<boolean>`

Returns whether the last item in the list is selected.

#### Returns

Type: `Promise<boolean>`



### `setFocusOnFirstItem() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setFocusOnLastItem() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [gux-command-palette-legacy](../gux-command-palette-legacy)

### Graph
```mermaid
graph TD;
  gux-command-palette-legacy --> gux-list-legacy
  style gux-list-legacy fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
