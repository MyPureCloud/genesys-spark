# genesys-accordion

This custom component is a simple menu containing a list of slots.

You can expand each item to reveal the content.

Every node in the element that contains a slot attribute will be set as a section in the accordion.

Other nodes will be removed from DOM.

## Example usage:

``` html
<genesys-accordion>
  <div slot="First Section">
    <span>I'm a span in a div.</span>
    <button>I'm the button.</button>
  </div>
  <p slot="Second Section">I'm a p.</p>
  <span slot="Third Section">I'm a span.</span>
  <h1>I'm an h1, but i'm not a slot.</h1>
</genesys-accordion>
```

<!-- Auto Generated Below -->


## Methods

### `close(slot: string) => void`

Closes a section.

#### Parameters

| Name   | Type     | Description   |
| ------ | -------- | ------------- |
| `slot` | `string` | The slot name |

#### Returns

Type: `void`



### `open(slot: string) => void`

Opens a section.

#### Parameters

| Name   | Type     | Description   |
| ------ | -------- | ------------- |
| `slot` | `string` | The slot name |

#### Returns

Type: `void`



### `toggle(slot: string) => void`

Toggles a section.

#### Parameters

| Name   | Type     | Description   |
| ------ | -------- | ------------- |
| `slot` | `string` | The slot name |

#### Returns

Type: `void`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
