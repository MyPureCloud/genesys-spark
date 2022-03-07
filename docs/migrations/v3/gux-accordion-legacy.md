# gux-accordion-legacy

[Back to main guide](./readme)

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

* gux-accordion
  * properties
    * heading-level
    * arrow-position

  * methods
    * open
    * close
    * toggle

## V3 Basic Migration

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

* gux-accordion-legacy
  * properties
    * heading-level
    * arrow-position

  * methods
    * open
    * close
    * toggle

## V3 Full Migration

```html
<gux-accordion arrow-position="beside-text">
  <gux-accordion-section>
    <h2 slot="header">First Section</h2>
    <div slot="content">
      <span>I'm a span in a div.</span>
      <button>I'm the button.</button>
    </div>
  </gux-accordion-section>
  <gux-accordion-section>
    <h2 slot="header">Second Section</h2>
    <p slot="content">I'm a p.</p>
  </gux-accordion-section>
  <gux-accordion-section>
    <h2 slot="header">Third Section</h2>
    <span slot="content">I'm a span.</span>
  </gux-accordion-section>
  <gux-accordion-section>
    <h2 slot="header">
      Fourth Section has a really really long title to see what it looks
      like when the title overflows
    </h2>
    <span slot="content">I'm a span.</span>
  </gux-accordion-section>
</gux-accordion>
```

* gux-accordion

* gux-accordion-section
  * properties
    * arrow-position
    * open

*Note: the 'arrow-position' is now on the `gux-accordion-section` component*

*Note: the functionality previously enabled by the removed `gux-accordion` methods {open, close, toggle} can be implemented in your application via the new `open` property on the `gux-accordion-section` component*
