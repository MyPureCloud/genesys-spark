# gux-list

A list element. In order to use this element list contents must be slotted in.

Example usage

```html
<gux-list>
  <gux-list-item value="test" text="test1" />
  <gux-list-divider />
  <gux-list-item value="test" text="test2" />
  <gux-list-item value="test" text="test3" />
</gux-list>
```

Example with slotting

```html
<gux-list>
  <gux-list-item
    ><span>⌘</span><gux-text-highlight text="test"
  /></gux-list-item>
</gux-list>
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

 - [gux-command-palette-legacy](../../legacy/gux-command-palette-legacy)
 - [gux-time-picker-beta](../../beta/gux-time-picker)

### Graph
```mermaid
graph TD;
  gux-command-palette-legacy --> gux-list
  gux-time-picker-beta --> gux-list
  style gux-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
