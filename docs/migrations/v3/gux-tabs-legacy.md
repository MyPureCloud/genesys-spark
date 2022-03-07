# gux-tabs-legacy

[Back to main guide](./readme)

## V2 Example

```html
<gux-tabs show-new-tab-button="true" allow-sort="true">
  <gux-tab tab-id="1" tab-icon-name="lock">
    <span slot="title">Tab Header 1</span>
    <span slot="dropdown-options">
      <gux-tab-dropdown-option
        option-id="1"
        icon-name="edit"
      >
        Edit
      </gux-tab-dropdown-option>
      <gux-tab-dropdown-option
        option-id="2"
        icon-name="clone"
      >
        Clone
      </gux-tab-dropdown-option>
      <gux-tab-dropdown-option
        option-id="3"
        icon-name="share"
      >
        Share
      </gux-tab-dropdown-option>
      <gux-tab-dropdown-option
        option-id="4"
        icon-name="download"
      >
        Download
      </gux-tab-dropdown-option>
    </span>
  </gux-tab>

  <gux-tab tab-id="2" tab-icon-name="lock">
    <span slot="title"> Hello World 2 </span>
  </gux-tab>
</gux-tabs>
```

* gux-tabs
  * properties
    * allow-sort
    * show-new-tab-button
    * value
    * tabLimit
* gux-tab
  * properties
    * active
    * tab-icon-name
    * tab-id
* gux-tab-dropdown-option
  * properties
    * iconName
    * optionId

## V3 Basic Migration

```html
<gux-tabs-legacy show-new-tab-button="true" allow-sort="true">
  <gux-tab-legacy tab-id="1" tab-icon-name="agent">
    <span slot="title">Tab Header 1</span>
    <span slot="dropdown-options">
      <gux-tab-dropdown-option-legacy
        option-id="1"
        icon-name="edit"
      >
        Edit
      </gux-tab-dropdown-option-legacy>
      <gux-tab-dropdown-option-legacy
        option-id="2"
        icon-name="clone"
      >
        Clone
      </gux-tab-dropdown-option-legacy>
      <gux-tab-dropdown-option-legacy
        option-id="3"
        icon-name="share"
      >
        Share
      </gux-tab-dropdown-option-legacy>
      <gux-tab-dropdown-option-legacy
        option-id="4"
        icon-name="download"
      >
        Download
      </gux-tab-dropdown-option-legacy>
    </span>
  </gux-tab-legacy>

  <gux-tab-legacy tab-id="2" tab-icon-name="user-directory">
    <span slot="title">Tab content 2</span>
  </gux-tab-legacy>
</gux-tabs-legacy>
```

* gux-tabs-legacy
  * properties
    * allow-sort
    * show-new-tab-button
    * value
    * tabLimit
* gux-tab-legacy
  * properties
    * active
    * tab-icon-name
    * tab-id
* gux-tab-dropdown-option-legacy
  * properties
    * iconName
    * optionId

## V3 Full Migration
There are now two new stable versions of tabs available to use in v3: gux-tabs and gux-tabs-advanced. gux-tabs-advanced contains all of the functionality in gux-tabs-legacy, including sorting and options. gux-tabs is a simpler tabs API that does not include sorting or tab options.

**TLDR: If you use tab options, sorting or new tab button, migrate to gux-tabs-advanced. If you just require a simple tabs component, you can choose to migrate to either gux-tabs-advanced or gux-tabs. gux-tabs is the recommended component to use for simple tab interfaces.**

### Migration to gux-tabs-advanced:

```html
  <gux-tabs-advanced>
    <gux-tab-advanced-list slot="tab-list" show-new-tab-button="true" allow-sort="true">
      <gux-tab-advanced tab-id="1" tab-icon-name="agent">
        <span slot="title">Tab Header 1</span>
        <span slot="dropdown-options">
          <gux-tab-advanced-option
            option-id="1"
            icon-name="edit"
          >
            Edit
          </gux-tab-advanced-option>
          <gux-tab-advanced-option
            option-id="2"
            icon-name="clone"
          >
            Clone
          </gux-tab-advanced-option>
          <gux-tab-advanced-option
            option-id="3"
            icon-name="share"
          >
            Share
          </gux-tab-advanced-option>
          <gux-tab-advanced-option
            option-id="4"
            icon-name="download"
          >
            Download
          </gux-tab-advanced-option>
        </span>
      </gux-tab-advanced>
      <gux-tab-advanced tab-id="2" tab-icon-name="user-directory">
        <span slot="title">Tab Header 2</span>
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

* gux-tabs-advanced
  * properties
    * active-tab
  * methods
    * guxActivate
* gux-tabs-advanced-list
  * properties
    * allow-sort
    * show-new-tab-button
    * tab-limit
  * methods
    * guxSetActive
* gux-tab-advanced
  * methods
    * guxFocus
* gux-tab-advanced-option
  * properties
    * icon-name
    * option-id
* gux-tab-advanced-panel
  * properties
    * tab-id
  * methods
    * guxSetActive

### Migration to gux-tabs:

```html
  <gux-tabs active-tab="1">
    <gux-tab-list slot="tab-list">
      <gux-tab tab-id="1">
      <gux-icon icon-name="agent" decorative="true"></gux-icon>
        <span>Tab Header 1</span>
      </gux-tab>
      <gux-tab tab-id="2">
        <gux-icon icon-name="user-directory" decorative="true"></gux-icon>
        <span>Tab Header 2</span>
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

* gux-tabs
  * properties
    * active-tab
    * alignment
    * orientation
  * methods
    * guxActivate
* gux-tab-list
  * methods
    * guxSetActive
* gux-tab
  * properties
    * gux-disabled
    * icon-only
    * tab-id
  * methods
    * guxFocus
* gux-tab-panel
  * properties
    * tab-id
  * methods
    * guxSetActive
