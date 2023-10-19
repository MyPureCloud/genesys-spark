# gux-modal-legacy

[Back to main guide](./readme.md)

## V3 Example

```html
<gux-modal initial-focus="#cancel-button" size="small">
  <div slot="title">Modal Title</div>
  <div slot="content">This contains the modal content.</div>
  <div slot="left-align-buttons">
    <gux-button type="button" accent="primary">Accept</gux-button>
  </div>
  <div slot="right-align-buttons">
    <gux-button id="cancel-button" type="button">Cancel</gux-button>
  </div>
</gux-modal>
```

## V4 Basic Migration: Add "-legacy" to tag name

Steps:

- Replace the `gux-modal` tag with `gux-modal-legacy` tag

```diff
- <gux-modal initial-focus="#cancel-button" size="small">
+ <gux-modal-legacy initial-focus="#cancel-button" size="small">
  ...
- </gux-modal>
+ <gux-modal-legacy>
```

Completed V3 Basic Migration:

```html
<gux-modal-legacy initial-focus="#cancel-button" size="small">
  <div slot="title">Modal Title</div>
  <div slot="content">This contains the modal content.</div>
  <div slot="left-align-buttons">
    <gux-button type="button" accent="primary">Accept</gux-button>
  </div>
  <div slot="right-align-buttons">
    <gux-button id="cancel-button" type="button">Cancel</gux-button>
  </div>
</gux-modal-legacy>
```

## V4 Full Migration

Steps:

- Rename the `left-align-buttons` slot `start-align-buttons`
- Rename the `right-align-buttons` slot `end-align-buttons`
- Use `gux-button-slot` components instead of `gux-button`
- Remove the `initial-focus` attribute from the `gux-modal` element. Instead, place the `autofocus` attribute on the element that you wish to focus first
- Remove the `trap-focus` attribute from the `gux-modal` element. The gux-modal uses the [dialog HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) internally, which manages trap focus within the modal
- Instead of adding and removing the `gux-modal` component from the DOM, use the `showModal` and `close` methods on the `gux-modal` component to hide and show the modal.

```diff
-<gux-modal initial-focus="#cancel-button" size="small">
+<gux-modal size="small">
  <div slot="title">Modal Title</div>
  <div slot="content">This contains the modal content.</div>
-  <div slot="left-align-buttons">
+  <div slot="start-align-buttons">
-    <gux-button type="button" accent="primary">Accept</gux-button>
+    <gux-button-slot accent="primary">
+       <button type="button">Accept</button>
+    </gux-button-slot>
  </div>
- <div slot="right-align-buttons">
+ <div slot="end-align-buttons">
-    <gux-button type="button">Cancel</gux-button>
+    <gux-button-slot>
+       <button autofocus type="button">Cancel</button>
+    </gux-button-slot>
  </div>
-</gux-modal-legacy>
+</gux-modal>
```
