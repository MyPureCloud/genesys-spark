# gux-action-toast-legacy

[Back to main guide](./readme.md)

A full migration of `gux-action-toast` upgrades the design to the latest UX standards and allows for easier design changes through css tokens

## V3 Example

```html
<gux-action-toast aria-live="polite">
  <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
  <div slot="title">Title</div>
  <div slot="message">This is the message</div>
  <gux-button slot="positive-button" accent="primary">Accept</gux-button>
  <gux-button slot="negative-button">Reject</gux-button>
</gux-action-toast>
```

## V4 Basic Migration: Add "-legacy" to Tag Name

Steps:

- Replace the `gux-action-toast` tag with `gux-action-toast-legacy` tag

```diff
- <gux-action-toast aria-live="polite">
+ <gux-action-toast-legacy aria-live="polite">
  ...
- </gux-action-toast>
+ </gux-action-toast-legacy>
```

Completed V3 Basic Migration:

```html
<gux-action-toast-legacy aria-live="polite">
  <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
  <div slot="title">Title</div>
  <div slot="message">This is the message</div>
  <gux-button slot="positive-button" accent="primary">Accept</gux-button>
  <gux-button slot="negative-button">Reject</gux-button>
</gux-action-toast-legacy>
```

## V4 Full Migration

Steps:

- Replace the `gux-action-toast` tag name with `gux-toast`. Set the `toast-type` property to `action`

```diff
- <gux-action-toast aria-live="polite">
+ <gux-toast toast-type="action" aria-live="polite">
  ...
- </gux-action-toast>
+ </gux-toast>
```

- Replace `gux-button` slotted tag names with regular `button`
- Replace `positive-button` and `negative-button` named slots with `primary-button` and `secondary-button`
- `accent` property is no longer needed

```diff
- <gux-button slot="positive-button" accent="primary">...</gux-button>
- <gux-button slot="negative-button">...</gux-button>
+ <button slot="primary-button">...</button>
+ <button slot="secondary-button">...</button>
```

Completed V4 Full Migration to `gux-toast`:

```html
<gux-toast toast-type="action" aria-live="polite">
  <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative></gux-icon>
  <div slot="title">2 Actions</div>
  <div slot="message">This is an example message</div>
  <button slot="primary-button" type="button" onclick="notify(event)">
    Action 1
  </button>
  <button slot="secondary-button" type="button" onclick="notify(event)">
    Action 2
  </button>
</gux-toast>
```

- gux-toast
  - properties
    - toast-type
  - events
    - guxdismiss

_Note: `title` and `secondary-button` named slots are optional_\
_Note: `aria-live` property is required for accessibility_
