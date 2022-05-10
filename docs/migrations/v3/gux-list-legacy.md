# gux-list-legacy

[Back to main guide](./readme)

To implement accessibility and usability improvements the api for gux-list and some related components needed to be changed.

gux-list(v2) was a componant that was used internally in gux-action-button(v2) and gux-button-multi(v2) and this is where we expect most teams to need to migrate their code when moving to v3 stable components.

They will need to replace
`gux-action-item`(similar to gux-list-item(v2)) -> `gux-list-item(v3)`

## V2 Example

```html
<gux-list>
  <gux-list-item value="test" text="test"></gux-list-item>
  <gux-list-divider></gux-list-divider>
  <gux-list-item value="test2">Some detail</gux-list-item>
  <gux-list-item text="test3" value="test3" disabled></gux-list-item>
  <gux-list-item value="test4">
    <div>
      <gux-icon class="example" icon-name="user-add" decorative="true"></gux-icon>
      Add User
    </div>
  </gux-list-item>
</gux-list>

<script>
  Array.from(document.querySelectorAll('gux-list-item')).forEach(
    (item) => {
      item.addEventListener('press', notify);
    }
  );
</script>
```

## V3 Basic Migration
This migration step should be skipped if possible because of accessibility issues in the component.

```html
<gux-list-legacy>
  <gux-list-item-legacy value="test" text="test"></gux-list-item-legacy>
  <gux-list-divider-legacy></gux-list-divider-legacy>
  <gux-list-item-legacy value="test2">Some detail</gux-list-item-legacy>
  <gux-list-item-legacy text="test3" value="test3" disabled></gux-list-item-legacy>
  <gux-list-item-legacy value="test4">
    <div>
      <gux-icon class="example" icon-name="user-add" decorative="true"></gux-icon>
      Add User
    </div>
  </gux-list-item-legacy>
</gux-list-legacy>

<script>
  Array.from(document.querySelectorAll('gux-list-item-legacy')).forEach(
    (item) => {
      item.addEventListener('press', notify);
    }
  );
</script>
```

## V3 Full Migration

```html
<gux-list>
  <gux-list-item onclick="notify(event, 'test')">Test</gux-list-item>
  <gux-list-divider></gux-list-divider>
  <gux-list-item onclick="notify(event, 'test2')">Some detail</gux-list-item>
  <gux-list-item onclick="notify(event, 'test3')" disabled>Test3</gux-list-item>
    <gux-list-item onclick="notify(event, 'test4')">
      <div>
        <gux-icon class="example" icon-name="user-add" decorative="true"></gux-icon>
        Add User
      </div>
    </gux-list-item>
</gux-list>
```

Notes:
* There is no longer a custom `press` event. You can use a `click` event on `gux-list-item` or `gux-action-item`.
* `gux-list-item` or `gux-action-item` no longer has a `text` property and all content must be slotted.
* `gux-list-item` or `gux-action-item` no longer has a `value` property so this information will have to be passed to your `click` handler directly
* Custom methods have been renamed and native ones supported.
  e.g.
   * `setFocusOnFirstItem` -> `guxFocusFirstItem`
   * `focus` method added
