# Web Component Design Guidelines

Best practices for developing presentational web components that have a nice API and are easy to work with.

## API Design

The general principle at work in our component APIs is that they should be consistent with patterns established
by native browser elements<sup>[1](#1-boolean-attributes)</sup>. They should feel familiar to users who are comfortable working
with native input elements and controls. We don't want downstream consumers to have to keep two different API
patterns in their head that they have to switch between depending on if they are working with native components
or Spark components.

- [Prefer structured markup](#prefer-structured-markup-over-complex-attributes-or-js-interfaces)
- [Use a consistent input API](#use-a-consistent-api-for-components-that-accept-input)
- [Don't use reflect](#dont-use-reflect)

### Prefer structured markup over complex attributes or js interfaces

Imagine we're going to create a component for representing menus. Menu data might look like this:

```javascript
{
  appetizers: [
    { name: 'fried pickles', price: 400 },
    { name: 'bruschetta', price: 500 }
  ],
  entrees: [
    { name: 'tacos', price: 600 },
    { name: 'hamburger', price: 700 }
  ]
}
```

#### Structured Markup (good)

This is a nice design. It lets the structure of the document match the structure of the data. If the API
need to be changed or split in the future, small pieces can be changed (like just updating `gux-menu-item`) while
the rest of the API remains stable. It's fairly easy to read and find problems in the input.

```html
<gux-menu>
  <gux-menu-section slot="appetizers">
    <gux-menu-item price="400">fried pickles</gux-menu-item>
    <gux-menu-item price="500">bruschetta</gux-menu-item>
  </gux-menu-section>
  <gux-menu-section slot="entrees">
    <gux-menu-item price="600">tacos</gux-menu-item>
    <gux-menu-item price="700">hamburger</gux-menu-item>
  </gux-menu-section>
</gux-menu>
```

#### Complex Attributes (bad)

This design is less useful. Putting the entire API into a single string makes the interface fragile (a stray typo
will break input parsing). Contract violations are also harder to detect, as there's one big contract for a single
element instead of multiple small contracts for small elements.

```html
<gux-menu menu-data="{ appetizers: [ ... ], entrees: [ ... ]}"></gux-menu>
```

#### JS API (bad)

This approach is even less useful than an attribute, since it shares most of the same disadvantages and
attributes can be accessed both via markup and a JavaScript API.

```html
<gux-menu id="theMenu"></gux-menu>
<script>
  document.getElmentById('theMenu').setData(menuData);
</script>
```

### Use a consistent API for components that accept input

For components that accept user input somehow, there should be consistent APIs for setting the value of
those components and for events emitted by the components. Nearly every framework handles input events by
listening for `input` events and checking the `value` property on the element that emitted the event. We
should enable that pattern in our components that accept input. To that end, components that accept input:

- Should have a `value` attribute and property, like the various native input-related elements
  - An additional boolean attribute similar to `checked` may be appropriate for elements with boolean state.
- Should emit an `input` event (at a minimum, `change` may also be useful) with the `detail` property on
  the event set to the data the component is intended to get from the user. Stencil complains about this, but
  we've never seen the scenarios where this could theoretically lead to problems happen in practice.

### Don't reflect attributes

Stencil properties can be set with the option `reflect`. When set, a change in an elements property will
also change the value of the attribute in the DOM. For example, when dealing with this input element:

```html
<my-custom-input id="myInput" value="default"></my-custom-input>
```

If `reflect` was set on `value`, then calling `document.getElementById("myInput").value = "new value"` would
mean that `document.getElementById("myInput").getAttr("value")` would now return "new value". This is _not_ how
native browser elements behave. It also puts the internal implementation of the component in conflict with the surrounding
framework used to render it about what the attribute's value should be, since it is being set twice, potentially leading
to bugs.

## CSS Guidelines

### Classes

Class names in components should be prefixed with `gux-` for consistency and to avoid conflicts with application class styles.
Most of our components use shadow DOM and cannot be styled externally, but there are exceptions where we've been forced to
drop it for a11y reasons. Since that makes the prefix sometimes necessary, it's much easier in code review or linting scenarios
to just have a single rule of always using the prefix.

Additionaly, avoid dynamically setting classes for styling on the root of a component based on the internal component state.
Application maintainers will also often set classes on our components and an application re-render that is not aware of our
class may remove it from the list. Instead, add a `gux-` prefixed attribute, and attach the conditional styles to that.

### Footnotes

#### 1. Boolean Attributes

When using boolean attributes on the components, adhere to the HTML specification rather than the Stencil JS specification for setting boolean attributes on components. For example, in Stencil JS, setting `disabled="false"` on a component explicitly sets the property to `false`. However, in the HTML spec, boolean attributes are considered `true` when present, regardless of their string value, which can lead to unexpected behavior in browsers and assistive technologies like NVDA that rely on the HTML spec. To ensure compatibility and correct behavior, omit boolean attributes entirely when they should be `false`, following standard HTML practices.
