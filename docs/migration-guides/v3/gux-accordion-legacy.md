# gux-accordion-legacy

[Back to main guide](./readme.md)

A full migration of the `gux-accordion-legacy` improves the `2.1.1 Keyboard`, `2.4.7 Focus Visible`, and `4.1.2: Name, Role, Value` WCAG Success Criteria.

## V2 Example

```html
<gux-accordion heading-level="2" arrow-position="beside-text">
  <div slot="First Section">
    <span>I'm a span in a div.</span>
    <button>I'm the button.</button>
  </div>
  <p slot="Second Section">I'm a p.</p>
  <span slot="Third Section">I'm a span.</span>
  <span
    slot="Fourth Section has a really really long title to see what it looks like when the title overflows"
    >I'm a span.</span
  >
  <h1>I'm an h1, but i'm not a slot.</h1>
</gux-accordion>
```

- gux-accordion
  - properties
    - heading-level
    - arrow-position

  - methods
    - open
    - close
    - toggle

## V3 Basic Migration: Add "-legacy" to tag name

Steps:

- Replace the `gux-accordion` tag with `gux-accordion-legacy` tag

```diff
- <gux-accordion heading-level="2" arrow-position="beside-text">
+ <gux-accordion-legacy heading-level="2" arrow-position="beside-text">
  ...
- </gux-accordion>
+ </gux-accordion-legacy>
```

Completed V3 Basic Migration:

```html
<gux-accordion-legacy heading-level="2" arrow-position="beside-text">
  <div slot="First Section">
    <span>I'm a span in a div.</span>
    <button>I'm the button.</button>
  </div>
  <p slot="Second Section">I'm a p.</p>
  <span slot="Third Section">I'm a span.</span>
  <span
    slot="Fourth Section has a really really long title to see what it looks like when the title overflows"
    >I'm a span.</span
  >
  <h1>I'm an h1, but i'm not a slot.</h1>
</gux-accordion-legacy>
```

- gux-accordion-legacy
  - properties
    - heading-level
    - arrow-position

  - methods
    - open
    - close
    - toggle

## V3 Full Migration

Steps

- Slot `gux-accordion-section` children into `gux-accordion` instead of using named slots
- `arrow-position` property should be removed from the `gux-accordion` component and should be set on the nested`gux-accordion-section` components

```diff
- <gux-accordion arrow-position="beside-text">
- <div slot="First Section">
+ <gux-accordion>
+   <gux-accordion-section arrow-position="beside-text">
+     <h2 slot="header">First Section</h2>
+     <div slot="content">
        <span>I'm a span in a div.</span>
        <button>I'm the button.</button>
      </div>
+   </gux-accordion-section>
  ...
</gux-accordion>
```

```html
<gux-accordion>
  <gux-accordion-section arrow-position="beside-text">
    <h2 slot="header">First Section</h2>
    <div slot="content">
      <span>I'm a span in a div.</span>
      <button>I'm the button.</button>
    </div>
  </gux-accordion-section>
  <gux-accordion-section arrow-position="beside-text">
    <h2 slot="header">Second Section</h2>
    <p slot="content">I'm a p.</p>
  </gux-accordion-section>
  <gux-accordion-section arrow-position="beside-text">
    <h2 slot="header">Third Section</h2>
    <span slot="content">I'm a span.</span>
  </gux-accordion-section>
  <gux-accordion-section arrow-position="beside-text">
    <h2 slot="header">
      Fourth Section has a really really long title to see what it looks like
      when the title overflows
    </h2>
    <span slot="content">I'm a span.</span>
  </gux-accordion-section>
</gux-accordion>
```

- gux-accordion

- gux-accordion-section
  - properties
    - arrow-position
    - open

_Note: the 'arrow-position' is now on the `gux-accordion-section` component_

_Note: the functionality previously enabled by the removed `gux-accordion` methods {open, close, toggle} can be implemented in your application via the new `open` property on the `gux-accordion-section` component_
