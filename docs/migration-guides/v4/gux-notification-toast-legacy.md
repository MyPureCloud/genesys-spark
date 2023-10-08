# gux-notification-toast-legacy

[Back to main guide](./readme.md)

A full migration of `gux-notification-toast` upgrades the design to the latest UX standards and allows for easier design changes through css tokens

## V3 Example

```html
<gux-notification-toast accent="positive" aria-live="polite">
  <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
  <div slot="title">Title</div>
  <div slot="message">This is the message</div>
</gux-notification-toast>
```

## V4 Basic Migration: Add "-legacy" to Tag Name

Steps:

- Replace the `gux-notification-toast` tag with `gux-notification-toast-legacy` tag

```diff
- <gux-notification-toast accent="positive" aria-live="polite">
+ <gux-notification-toast-legacy accent="positive" aria-live="polite">
  ...
- </gux-notification-toast>
+ </gux-notification-toast-legacy>
```

Completed V3 Basic Migration:

```html
<gux-notification-toast-legacy accent="positive" aria-live="polite">
  <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
  <div slot="title">Title</div>
  <div slot="message">This is the message</div>
</gux-notification-toast-legacy>
```

## V4 Full Migration

Steps:

- Replace the `gux-notification-toast` tag name with `gux-toast`
- Replace the `accent` property to `toast-type` and set it to one of the corresponding types
  - `positive` -> `success`
  - `warning` (same)
  - `alert` -> `error`
  - `neutral` -> `info`

```diff
- <gux-notification-toast accent="positive" aria-live="polite">
+ <gux-toast toast-type="success" aria-live="polite">
  ...
- </gux-notification-toast>
+ </gux-toast>
```

- Remove `icon` named slot

Completed V4 Full Migration to `gux-toast`:

```html
<gux-toast toast-type="success" aria-live="polite">
  <div slot="title">Title</div>
  <div slot="message">This is an example message</div>
  <a slot="link" href="#">Optional Link</a>
</gux-toast>
```

- gux-toast
  - properties
    - toast-type
  - events
    - guxdismiss

_Note: `title` and `link` named slots are optional_\
_Note: `aria-live` property is required for accessibility_\
_Note: `toast-type` default value is `success`_
