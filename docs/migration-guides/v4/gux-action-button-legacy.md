# gux-action-button-legacy

[Back to main guide](./readme.md)

## V3 Example

```html
<gux-action-button-legacy text="Primary" accent="primary" is-open="true">
  <gux-action-item text="test"></gux-action-item>
  <gux-action-item text="test2"></gux-action-item>
  <gux-action-item text="test3"></gux-action-item>
  <gux-list-divider></gux-list-divider>
  <gux-action-item><span>I am a span</span></gux-action-item>
</gux-action-button-legacy>
```

## V4 Migration

Steps:

- Replace the `gux-action-item` tag name with `gux-list-item`
  - The `gux-list-item` does not have a `text` property. All content must be slotted within `gux-list-item`.
  - The `gux-list-item` does not have a `value` property so this information will have to be passed to your `click` handler directly

```diff
-  <gux-action-item text="test"></gux-action-item>
+  <gux-list-item>test</gux-list-item>
```

Completed V3 Full Migration:

```html
  <gux-action-button text="Primary" accent="primary" is-open="true">
    <gux-list-item>test</gux-list-item>
    <gux-list-item>test2</gux-list-item>
    <gux-list-item>test3</gux-list-item>
    <gux-list-divider></gux-list-divider>
    <gux-list-item>I am a span</span></gux-list-item>
  </gux-action-button>
```
