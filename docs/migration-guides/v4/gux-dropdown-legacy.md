# gux-dropdown-legacy

[Back to main guide](./readme.md)

## V3 Example

```html
<gux-dropdown-legacy placeholder="Select an animal">
  <gux-option-legacy value="a">Ant</gux-option-legacy>
  <gux-option-legacy value="b">Bat</gux-option-legacy>
  <gux-option-legacy value="c">Cat</gux-option-legacy>
  <gux-option-legacy value="d">Dog</gux-option-legacy>
</gux-dropdown-legacy>
```

## V4 Migration

Steps:

- Replace `gux-dropdown-legacy` tags with `gux-dropdown` tags.

```diff
-  <gux-dropdown-legacy placeholder="Select an animal">
+  <gux-dropdown placeholder="Select an animal">
...
-  </gux-dropdown-legacy>
+  </gux-dropdown>
```

- Replace `gux-option-legacy` tags with `gux-option` tags.
- Add a `gux-listbox` component as a container for the `gux-option` components. `gux-listbox` requires an `aria-label` for accessibility compliance.

```diff
...
-  <gux-option-legacy value="b">Bat</gux-option-legacy>
-  <gux-option-legacy value="c">Cat</gux-option-legacy>
-  <gux-option-legacy value="d">Dog</gux-option-legacy>
+   <gux-listbox aria-label="Animals">
+     <gux-option value="a">Ant</gux-option>
+     <gux-option value="b">Bat</gux-option>
+     <gux-option value="c">Cat</gux-option>
+     <gux-option value="d">Dog</gux-option>
+   </gux-listbox>
...
```

Completed V4 Migration

```html
<gux-dropdown placeholder="Select an animal">
  <gux-listbox aria-label="Animals">
    <gux-option value="a">Ant</gux-option>
    <gux-option value="b">Bat</gux-option>
    <gux-option value="c">Cat</gux-option>
    <gux-option value="d">Dog</gux-option>
  </gux-listbox>
</gux-dropdown>
```

These stable dropdown components have some properties and events that were not available in the legacy version that you should review to see if they are useful to your use case.

- gux-dropdown
  - properties
    - disabled
    - filter-type
    - has-error
    - loading
    - placeholder
    - required
    - value
  - events
    - guxcollapsed
    - guxexpanded
    - guxfilter

- gux-listbox
  - properties
    - emptyMessage
    - filter
    - filterType
    - loading
    - value

- gux-option
  - properties
    - active
    - disabled
    - filtered
    - selected
    - value
