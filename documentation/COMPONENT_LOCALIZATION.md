# Web Component Localization

## Localizing a component
* Each component that needs localized text should have an `./i18n/en.json` in the components folder.
* The translation helper function and type should be imported from `src/i18n` e.g. `import { buildI18nForComponent, GetI18nValue } from '../../../i18n';`
* The translation resources should be imported into the component file `import translationResources from './i18n/en.json';`
* The component should have a `private i18n: GetI18nValue;` property where the localized text will be stored.
* The component should set the localized text in the `componentWillLoad` hook
  ```
  async componentWillLoad(): Promise<void> {
    ...

    this.i18n = await buildI18nForComponent(this.root, translationResources);

    ...
  }
  ````
* The localized text can now be referenced where needed in the component e.g. `this.i18n(<key from json in en.json file>)`

## Localization process
* `npm run update-en-i18n` iterates through each components `./i18n/en.json` file and amalgamates them into a single json file
  `/src/i18n/translations/en.json` where each components translations are grouped by component name.
* The localization team track all changes to `/src/i18n/translations/en.json` and updates all other locale files located in the
  `/src/i18n/translations` folder to sync up with it.
* `npm run build-i18n` processes all these locale files and places locale files in the library's `dist` folder.
