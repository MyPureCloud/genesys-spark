# Dark Mode

The tokens and components we supply now support dark mode.
This can be enabled by adding a `flare-mode` attribute with the value set to `'dark'` to an element`.
That element and its children will then display the dark mode color palette.

```diff
- <html>
+ <html flare-mode="dark">
```

To display the light mode you can either change the value to `'light'` or remove the `flare-mode` attribute.

```diff
- <html flare-mode="dark">
+ <html flare-mode="light">
```

```diff
- <html flare-mode="dark">
+ <html>
```

\_Note: While dark mode support at the token and component level is available, the decision to implement dark mode across the product requires careful consideration and collaboration with UX and Product Management (PM). Your application should not implement dark mode without consulting these stakeholders.
