# gux-action-button-legacy

[Back to main guide](./readme.md)

## V3 Example

```html
<gux-action-button-legacy text="Primary" accent="primary" is-open="true">
  <gux-action-item text="test"></gux-action-item>
  <gux-action-item text="test2"></gux-action-item>
  <gux-action-item text="test3"></gux-action-item>
  <gux-action-list-divider></gux-action-list-divider>
  <gux-action-item><span>I am a span</span></gux-action-item>
</gux-action-button-legacy>
```

## V4 Migration

Steps:

- Replace the `gux-action-button-legacy` tag's text property with a `title` slot

```diff
-  <gux-action-button-legacy text="Primary" accent="primary" is-open="true">
+  <gux-action-button accent="primary" is-open="true">
+    <div slot="title">Primary</div>
     <gux-list-item>test</gux-list-item>
```

- Replace the `gux-action-item` tag name with `gux-list-item`
  - The `gux-list-item` does not have a `text` property. All content must be slotted within `gux-list-item`.
  - The `gux-list-item` does not have a `value` property so this information will have to be passed to your `click` handler directly

```diff
-  <gux-action-item text="test"></gux-action-item>
+  <gux-list-item>test</gux-list-item>
```

- Replace the `gux-action-list-divider` tag name with `gux-list-divider`

```diff
-  <gux-action-list-divider></gux-action-list-divider>
+  <gux-list-divider></gux-list-divider>
```

Completed V4 Migration:

```html
  <gux-action-button accent="primary" is-open="true">
    <div slot="title">Primary</div>
    <gux-list-item>test</gux-list-item>
    <gux-list-item>test2</gux-list-item>
    <gux-list-item>test3</gux-list-item>
    <gux-list-divider></gux-list-divider>
    <gux-list-item>I am a span</span></gux-list-item>
  </gux-action-button>
```
