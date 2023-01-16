# Web Component Localization

## Requirements
* Each component that needs localized text should have an `./i18n/en.json` in the components folder.
* The translation helper function and type should be imported from `src/i18n` e.g. `import { buildI18nForComponent, GetI18nValue } from '../../../i18n';
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
