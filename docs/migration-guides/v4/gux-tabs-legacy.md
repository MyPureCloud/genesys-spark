# gux-tabs-legacy

[Back to main guide](./readme.md)

## V3 Example

Completed V3 Basic Migration:

```html
<gux-tabs-legacy show-new-tab-button="true" allow-sort="true">
  <gux-tab-legacy tab-id="1" tab-icon-name="agent">
    <span slot="title">Tab Header 1</span>
    <span slot="dropdown-options">
      <gux-tab-dropdown-option-legacy option-id="1" icon-name="edit">
        Edit
      </gux-tab-dropdown-option-legacy>
      <gux-tab-dropdown-option-legacy option-id="2" icon-name="clone">
        Clone
      </gux-tab-dropdown-option-legacy>
    </span>
  </gux-tab-legacy>
  <gux-tab-legacy tab-id="2" tab-icon-name="user-directory">
    <span slot="title">Tab content 2</span>
  </gux-tab-legacy>
</gux-tabs-legacy>
```

## V4 Migration

There are now **two** stable versions of tabs available to use in v4: `gux-tabs` and `gux-tabs-advanced`. `gux-tabs-advanced` contains all of the functionality in `gux-tabs-legacy`, including sorting and options. gux-tabs is a simpler tabs API that does not include sorting or tab options.

**TLDR: If you use tab options, sorting or new tab button, migrate to gux-tabs-advanced. If you just require a simple tabs component, you can choose to migrate to either gux-tabs-advanced or gux-tabs. gux-tabs is the recommended component to use for simple tab interfaces.**

### Option 1: Migration to gux-tabs-advanced:

Steps:

- Replace the `gux-tabs-legacy` tag name with `gux-tabs-advanced`
  ```diff
  - <gux-tabs-legacy>
  + <gux-tabs-advanced>
    ...
  - </gux-tabs-legacy>
  + </gux-tabs-advanced>
  ```
- Replace the `gux-tab-legacy` tag name with `gux-tab-advanced`.

  - The `tab-icon-name` property has been removed. Slot the icon in the `gux-tab-advanced` component instead.
  - The `title` named slot has been removed. Slot the text directly into the `gux-tab-advanced` component.

  ```diff
  - <gux-tab-legacy tab-id="1" tab-icon-name="agent">
  -   <span slot="title">Tab Header 1</span>
  - </gux-tab-legacy>
  + <gux-tab-advanced tab-id="1">
  +   <gux-icon icon-name="agent" decorative="true"></gux-icon>
  +   Tab Header 1
  + </gux-tab-advanced>
  ```

- Replace the `<span slot="dropdown-options">` with `<gux-list slot="dropdown-options>`. Remove the `gux-tab-dropdown-option` component and use `gux-list-item` instead:

  ```diff
  - <span slot="dropdown-options">
  -   <gux-tab-dropdown-option-legacy
  -     option-id="1"
  -     icon-name="edit"
  -   >
  + <gux-list slot="dropdown-options">
  +   <gux-list-item>
  +     <gux-icon icon-name="edit" decorative="true"></gux-icon>
        Edit
  -   </gux-tab-dropdown-option>
  -  </span>
  +  </gux-list-item>
  + </gux-list>

  ```

- Nest the `gux-tab-advanced` components within `gux-tab-advanced-list`. The `show-new-tab-button` and `allow-sort `properties should be set on the `gux-tab-advanced-list` component.

  ```diff
  <gux-tabs-advanced>
  + <gux-tab-advanced-list slot="tab-list" show-new-tab-button="true" allow-sort="true">
      <gux-tab-advanced tab-id="2">
        <gux-icon icon-name="user-directory" decorative="true"></gux-icon>
        Tab Header 2
      </gux-tab-advanced>
      ...
  + </gux-tab-advanced-list>
    ...
  </gux-tabs-advanced>
  ```

- For accessibility reasons, tabs need associated tab panels. Add `gux-tab-advanced-panel` components that will act as containers for your tab panel content. Associate the tab panel with its tab by setting the `tab-id ` property on the `gux-tab-advanced` and `gux-tab-advanced-panel` to the same value.

Completed Migration to `gux-tabs-advanced`

```html
<gux-tabs-advanced>
  <gux-tab-advanced-list
    slot="tab-list"
    show-new-tab-button="true"
    allow-sort="true"
  >
    <gux-tab-advanced tab-id="1">
      <gux-icon icon-name="agent" decorative="true"></gux-icon>
      Tab Header 1
      <gux-list slot="dropdown-options">
        <gux-list-item>
          <gux-icon icon-name="edit" decorative="true"></gux-icon>
          Edit
        </gux-list-item>
        <gux-list-item>
          <gux-icon icon-name="clone" decorative="true"></gux-icon>
          Clone
        </gux-list-item>
      </gux-list>
    </gux-tab-advanced>
    <gux-tab-advanced tab-id="2">
      <gux-icon icon-name="user-directory" decorative="true"></gux-icon>
      Tab Header 2
    </gux-tab-advanced>
  </gux-tab-advanced-list>
  <gux-tab-advanced-panel tab-id="1">
    <span>Tab content 1</span>
  </gux-tab-advanced-panel>
  <gux-tab-advanced-panel tab-id="2">
    <span>Tab content 2</span>
  </gux-tab-advanced-panel>
</gux-tabs-advanced>
```

### Option 2: Migration to `gux-tabs`:

Steps:

- `dropdown-options` are not compatible with `gux-tabs`, remove or use the `gux-tabs-advanced` component instead

```diff
-    <span slot="dropdown-options">
-     <gux-tab-dropdown-option option-id="1" icon-name="edit">
-       Edit
-      </gux-tab-dropdown-option>
-      <gux-tab-dropdown-option option-id="2" icon-name="clone">
-        Clone
-      </gux-tab-dropdown-option>
-    </span>
```

- The `tab-icon-name` property has been removed. Slot the icon in the `gux-tab` component.
- The `title` named slot has been removed. Slot the text directly into the `gux-tab` component

```diff
- <gux-tab-legacy tab-id="1" tab-icon-name="agent">
-   <span slot="title">Tab Header 1</span>
- </gux-tab-legacy>
+ <gux-tab tab-id="1">
+   <gux-icon icon-name="agent" decorative="true"></gux-icon>
+   Tab Header 1
+ </gux-tab>
```

- Nest the `gux-tab` components within a `gux-tab-list` component. The `show-new-tab-button` and `allow-sort` properties are not compatible with `gux-tabs`. If this functionality is needed use `gux-tabs-advanced` instead

```diff
<gux-tabs-legacy>
+ <gux-tab-advanced-list slot="tab-list" show-new-tab-button="true" allow-sort="true">
    <gux-tab tab-id="1">
      <gux-icon icon-name="agent" decorative="true"></gux-icon>
      Tab Header 1
    </gux-tab>
    ...
+ </gux-tab-advanced-list>
  ...
</gux-tabs-legacy>
```

- For accessibility reasons, tabs need associated tab panels. Add `gux-tab-panel` components that will act as containers for your tab panel content. Associate the tab panel with its tab by setting the `tab-id ` property on the `gux-tab` and `gux-tab-panel` to the same value.

Completed Migration to `gux-tabs`

```html
<gux-tabs active-tab="1">
  <gux-tab-list slot="tab-list">
    <gux-tab tab-id="1">
      <gux-icon icon-name="agent" decorative="true"></gux-icon>
      Tab Header 1
    </gux-tab>
    <gux-tab tab-id="2">
      <gux-icon icon-name="user-directory" decorative="true"></gux-icon>
      Tab Header 2
    </gux-tab>
  </gux-tab-list>
  <gux-tab-panel tab-id="1">
    <span>Tab content 1</span>
  </gux-tab-panel>
  <gux-tab-panel tab-id="2">
    <span>Tab content 2</span>
  </gux-tab-panel>
</gux-tabs>
```
