# gux-list-legacy

A full migration of the `gux-action-button` improves the overall accessible ease of use and addresses `2.1.1 Keyboard` and `4.1.2: Name, Role, Value` WCAG Success Criteria.
[Back to main guide](./readme.md)

To implement accessibility and usability improvements the api for gux-list and some related components needed to be changed.

A full migration of the `gux-list` component improves the `2.1.1 Keyboard`, `2.4.7 Focus Visible`, and `4.1.2: Name, Role, Value` WCAG Success Criteria.

`gux-list(v2)` was a component that was used internally in `gux-action-button(v2)` and `gux-button-multi(v2)` and this is where we expect most teams to need to migrate their code when moving to v3 stable components.

See the [gux-action-button](./gux-action-button-legacy.md) and [gux-button-multi](./gux-button-multi-legacy.md) migration guides for more information.

## V2 Example

```html
<gux-list>
  <gux-list-item value="test" text="test"></gux-list-item>
  <gux-list-divider></gux-list-divider>
  <gux-list-item value="test2">Some detail</gux-list-item>
  <gux-list-item text="test3" value="test3" disabled></gux-list-item>
  <gux-list-item value="test4">
    <div>
      <gux-icon
        class="example"
        icon-name="user-add"
        decorative="true"
      ></gux-icon>
      Add User
    </div>
  </gux-list-item>
</gux-list>

<script>
  Array.from(document.querySelectorAll('gux-list-item')).forEach(item => {
    item.addEventListener('press', notify);
  });
</script>
```

## V3 Basic Migration: Add "-legacy" to tag names

This migration step should be skipped if possible because of accessibility issues in the component.

Steps:

- Replace `gux-list` tag with `gux-list-legacy`

```diff
-  <gux-list>
+  <gux-list-legacy>
  ...
-  </gux-list>
+  </gux-list-legacy>
```

- Replace `gux-list-item` tag with `gux-list-item-legacy`

```diff
-  <gux-list-item value="test" text="test"></gux-list-item>
+  <gux-list-item-legacy value="test" text="test"></gux-list-item-legacy>
```

- Replace `gux-list-divider` tag with `gux-list-divider-legacy`

```diff
-  <gux-list-divider></gux-list-divider>
+  <gux-list-divider-legacy></gux-list-divider-legacy>
```

Completed V3 Basic Migration

```html
<gux-list-legacy>
  <gux-list-item-legacy value="test" text="test"></gux-list-item-legacy>
  <gux-list-divider-legacy></gux-list-divider-legacy>
  <gux-list-item-legacy value="test2">Some detail</gux-list-item-legacy>
  <gux-list-item-legacy
    text="test3"
    value="test3"
    disabled
  ></gux-list-item-legacy>
  <gux-list-item-legacy value="test4">
    <div>
      <gux-icon
        class="example"
        icon-name="user-add"
        decorative="true"
      ></gux-icon>
      Add User
    </div>
  </gux-list-item-legacy>
</gux-list-legacy>

<script>
  Array.from(document.querySelectorAll('gux-list-item-legacy')).forEach(
    item => {
      item.addEventListener('press', notify);
    }
  );
</script>
```

## V3 Full Migration

Steps:

- `gux-list-item`
  - Slot text content. The `gux-list-item` no longer has a `text` property. All content must be slotted within `gux-list-item`.
  - Pass 'value' information to your `click` handler directly. The `gux-list-item` no longer has a `value` property.

```diff
-  <gux-list-item value="test" text="test"></gux-list-item>
+  <gux-list-item onclick="notify(event, 'test')">Test</gux-list-item>
```

Completed V3 Basic Migration:

```html
<gux-list>
  <gux-list-item onclick="notify(event, 'test')">Test</gux-list-item>
  <gux-list-divider></gux-list-divider>
  <gux-list-item onclick="notify(event, 'test2')">Some detail</gux-list-item>
  <gux-list-item onclick="notify(event, 'test3')" disabled>Test3</gux-list-item>
  <gux-list-item onclick="notify(event, 'test4')">
    <div>
      <gux-icon
        class="example"
        icon-name="user-add"
        decorative="true"
      ></gux-icon>
      Add User
    </div>
  </gux-list-item>
</gux-list>
```

Notes:

- There is no longer a custom `press` event. You can use a `click` event on `gux-list-item` or `gux-action-item`.
- `gux-list-item` or `gux-action-item` no longer has a `text` property and all content must be slotted.
- `gux-list-item` or `gux-action-item` no longer has a `value` property so this information will have to be passed to your `click` handler directly
- The unused interface `IListItem` is no longer exported.
- Custom methods have been renamed and native ones supported.
  e.g.
  - `setFocusOnFirstItem` -> `guxFocusFirstItem`
  - `focus` method added
