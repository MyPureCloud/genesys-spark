# Side Panel Breaking Changes

## Overview

The Side Panel component has got some enhancements to impove the user experience & to make it more flexible, modular & accessible. This has led to some breaking changes.

## What Changed

### Component Architecture

The new side panel system is built with a more modular component architecture:

- **`gux-side-panel-beta`** - Main container component
- **`gux-side-panel-header`** - Header component with icon, title, description, and badge
- **`gux-side-panel-heading`** - Title component with configurable heading levels
- **`gux-modal-side-panel-beta`** - Modal variant that is a proxy for the main side panel

## Breaking Changes

### 1. Slot Structure

- The `gux-side-panel-heading` component must now be placed inside the heading slot of `gux-side-panel-header`.
- The `description` slot has moved from `gux-side-panel-beta` to `gux-side-panel-header`.
- It is recommended to slot a `<footer>` into the footer slot like this: `<footer slot="footer">`.

**Before:**

```html
<gux-side-panel-beta size="medium">
  <gux-side-panel-heading
    slot="heading"
    level="3"
    icon-name="fa/diamond-regular"
  >
    Side panel title
  </gux-side-panel-heading>
  <h2 slot="description">Side panel description.</h2>
  <div slot="content">
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames.
  </div>
  <div slot="footer">
    <gux-cta-group>
      <gux-button slot="primary">Primary</gux-button>
      <gux-button slot="secondary">Secondary</gux-button>
    </gux-cta-group>
  </div>
</gux-side-panel-beta>
```

**After:**

```html
<gux-side-panel-beta size="medium">
  <gux-side-panel-header slot="header">
    <gux-side-panel-heading slot="title">
      Side Panel Heading
    </gux-side-panel-heading>
    <gux-icon
      slot="icon"
      decorative
      size="medium"
      icon-name="user-add"
      screenreader-text="add John Smith to contact list"
    ></gux-icon>
    <div slot="description">Side panel description.</div>
    <gux-badge slot="badge">New</gux-badge>
  </gux-side-panel-header>
  <div slot="content">
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames.
  </div>
  <footer slot="footer" aria-label="Side panel footer">
    <gux-cta-group>
      <gux-button slot="primary">Primary</gux-button>
      <gux-button slot="secondary">Secondary</gux-button>
    </gux-cta-group>
  </footer>
</gux-side-panel-beta>
```

### 4. Header Component Structure

The header is now a separate component with its own slots:

```html
<gux-side-panel-header slot="header">
  <gux-side-panel-heading slot="title">Title</gux-side-panel-heading>
  <gux-icon slot="icon" icon-name="user" decorative></gux-icon>
  <div slot="description">Description</div>
  <gux-badge slot="badge">Badge</gux-badge>
</gux-side-panel-header>
```

### 5. Event Names

- `gux-modal-side-panel-beta` has its own dismiss event `modalSidePanelDismiss`.
- `gux-side-panel-beta` continues to have `sidePanelDismiss`.

## Migration Steps (if applicable)

- Step 1: Wrap heading component inside the new header component.
- Step 2: Move description to header component.
- Step 3: Slot a html footer on teh footer slot instead of a div.
- Step 4: Update dismiss event Listener on the modal version.
