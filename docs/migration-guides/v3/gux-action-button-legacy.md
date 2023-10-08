# gux-action-button-legacy

[Back to main guide](./readme.md)

The `gux-action-button(v2)` api was changed to improve accessibility and usability of the component. A full migration of the `gux-action-button` improves the `2.1.1 Keyboard`, `2.4.7 Focus Visible`, and `4.1.2: Name, Role, Value` WCAG Success Criteria.

## V2 Example

```html
<gux-action-button text="Primary" accent="primary" is-open="true">
  <gux-action-item text="test"></gux-action-item>
  <gux-action-item text="test2"></gux-action-item>
  <gux-action-item text="test3"></gux-action-item>
  <gux-list-divider></gux-list-divider>
  <gux-action-item><span>I am a span</span></gux-action-item>
</gux-action-button>
```

## V3 Basic Migration: Add "-legacy" to tag name

This migration step should be skipped if possible because of accessibility issues in the component. If possible follow the V3 Full Migration steps.

Steps:

- Replace the `gux-action-button` tag with `gux-action-button-legacy` tag

```diff
-  <gux-action-button text="Primary" accent="primary" is-open="true">
+  <gux-action-button-legacy text="Primary" accent="primary" is-open="true">
  ...
-  </gux-action-button>
+ </gux-action-button-legacy>
```

Completed V3 Basic Migration:

```html
<gux-action-button-legacy text="Primary" accent="primary" is-open="true">
  <gux-action-item text="test"></gux-action-item>
  <gux-action-item text="test2"></gux-action-item>
  <gux-action-item text="test3"></gux-action-item>
  <gux-list-divider></gux-list-divider>
  <gux-action-item><span>I am a span</span></gux-action-item>
</gux-action-button-legacy>
```

## V3 Full Migration

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
