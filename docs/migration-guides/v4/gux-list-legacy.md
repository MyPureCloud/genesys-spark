# gux-list-legacy

## V3 Example

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

## V4 Migration

Steps:

- Replace the `gux-list-legacy` tag name with `gux-list`

```diff
-  <gux-list-legacy>
+  <gux-list>
-  </gux-list-legacy>
+  </gux-list>
```

- Replace the `gux-list-item-legacy` tag name with `gux-list-item`
  - Slot text content. `gux-list-item` has no `text` property like `gux-list-item-legacy`. All content must be slotted within `gux-list-item`.
  - Pass 'value' information to your `click` handler directly. `gux-list-item` has no `value` property like `gux-list-item-legacy`
  - `gux-list-item` has no custom `press` event like `gux-list-item-legacy`. You must use a `click` event on `gux-list-item`.

```diff
-  <gux-list-item-legacy text="Test"></gux-list-item-legacy>
+  <gux-list-item>Test</gux-list-item>
```

- Replace the `gux-list-divider-legacy` tag name with `gux-list-divider`

```diff
-  <gux-list-divider-legacy>
+  <gux-list-divider>
-  </gux-list-divider-legacy>
+  </gux-list-divider>
```

Completed V4 Migration:

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
