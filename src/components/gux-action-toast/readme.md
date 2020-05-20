# gux-action-toast

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 

<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                        | Type                         | Default     |
| ----------------- | ------------------ | ---------------------------------- | ---------------------------- | ----------- |
| `icon`            | `icon`             | The icon name of the title.        | `string`                     | `undefined` |
| `iconUri`         | `icon-uri`         | The icon uri of the title.         | `string`                     | `undefined` |
| `idToast`         | `id-toast`         | The id of the title.               | `string`                     | `undefined` |
| `keyValues`       | --                 | The key values of the toast.       | `{ [key: string]: string; }` | `{}`        |
| `message`         | `message`          | The message of the toast.          | `string`                     | `undefined` |
| `primaryButton`   | `primary-button`   | The right button.                  | `any`                        | `undefined` |
| `secondaryButton` | `secondary-button` | The left button.                   | `any`                        | `undefined` |
| `subject`         | `subject`          | The subject of the toast.          | `string`                     | `undefined` |
| `toastTitle`      | `toast-title`      | The toast title.                   | `string`                     | `undefined` |
| `topBorderColor`  | `top-border-color` | The top border color of the toast. | `string`                     | `undefined` |


## Events

| Event         | Description | Type               |
| ------------- | ----------- | ------------------ |
| `buttonClick` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [gux-icon](../gux-icon)
- [gux-button](../gux-button)

### Graph
```mermaid
graph TD;
  gux-action-toast --> gux-icon
  gux-action-toast --> gux-button
  style gux-action-toast fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
