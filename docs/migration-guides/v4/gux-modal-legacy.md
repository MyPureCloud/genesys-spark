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

- Replace the `left-align-buttons` and `right-align-buttons` slots with a `footer` slot. Refer to `gux-cta-group` docs for the preferred way to implement the `footer` slot [Spark WCL Playground](https://apps.inindca.com/common-ui-docs/packages/genesys-webcomponents/)
- Use `gux-button-slot` components instead of `gux-button`
- Remove the `initial-focus` attribute from the `gux-modal` element. Instead, place the `autofocus` attribute on the element that you wish to focus first
- Remove the `trap-focus` attribute from the `gux-modal` element. The gux-modal uses the [dialog HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) internally, which manages trap focus within the modal
- There are two mechanisms for showing/hiding modals in v4, to support both of the common approaches we see.
  - You can render the modal, and use the `showModal` and `close` methods on the `gux-modal` element to show and hide it.
  - Alternatively, if you only want to render the modal when visible, add the `open` attribute to have it render in an initially open state
- If you were relying on the `trap-focus` attribute that was present in v3 in an inaccessible way you can use the new `inaccessible-tab-trap` attribute to get that functionality in v4. This will be an accessibility violation and you should look to fix the UX of your app so that it is not required ASAP.

```diff
-<gux-modal initial-focus="#cancel-button" size="small">
+<gux-modal size="small">
  <div slot="title">Modal Title</div>
  <div slot="content">This contains the modal content.</div>
+  <gux-cta-group slot="footer">
-  <div slot="left-align-buttons">
-    <gux-button type="button" accent="primary">Accept</gux-button>
+    <gux-button-slot slot="primary">
+       <button type="button">Accept</button>
+    </gux-button-slot>
- </div>
- <div slot="right-align-buttons">
-    <gux-button type="button">Cancel</gux-button>
+    <gux-button-slot slot="dismiss">
+       <button autofocus type="button">Cancel</button>
+    </gux-button-slot>
- </div>
+ </gux-cta-group>
-</gux-modal-legacy>
+</gux-modal>
```
