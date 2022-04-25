# Contributing To Common Web Components

- [Before Starting](#before-starting)
- [While Working](#while-working)
- [During Review](#during-review)

## Adding Components and Features

### Before Starting

#### For Genesys Employees

- Make sure what you're building is in the [Spark Design System Guidelines](https://spark.genesys.com)
- If you would like to request a new component or new feature for existing component, follow the steps on the [Spark Component Submission](https://spark.genesys.com/7978beca0/p/641cfa-component-submission) page.
- Check the [Common UI Board](https://inindca.atlassian.net/projects/COMUI) in JIRA to make sure nobody else is already working on your feature.
- Create or find an issue on the [Common UI Board](https://inindca.atlassian.net/projects/COMUI) for your feature, or assign the issue to yourself.

#### For External Contributors

- Open a GitHub Issue describing the issue you are looking to solve, or the feature you'd like to add, for discussion with the maintainers.

### While Working

- Use `npm run commit` or `git cz` to ensure correctly formatted commit messages. ([Commitizen](https://github.com/commitizen/cz-cli))
- Components should follow our best practices for [Component Design](./COMPONENT_DESIGN.md)
- Components should be implemented in TypeScript, with Stencil (if you think you need to deviate from this, talk to the common UI dev team first)
- Create tests for your component
  - Use unit tests for helper utils and any JS APIs on the component
  - Use [Puppeteer](https://developers.google.com/web/tools/puppeteer) e2e tests for user interactions
  - Create a [snapshot test](https://jestjs.io/docs/en/snapshot-testing) for detecting unintended markup changes
  - Be sure your component meets the [Testing and Building Accessible Components Guidelines](./A11Y_TESTING.md)
- Make sure any text generated within your component uses the `i18n` localization tools for string replacement. Refer to the [Genesys Cloud Localization Process](https://intranet.genesys.com/display/Localization/Genesys+Cloud+Localization+Process) for more information about the localization process.
- Each component should include a file with example usages
  - Examples should include all presentational variations
- Format your code based on the `.prettierrc.json` settings (configuring auto-format with [Prettier](https://prettier.io/) is highly recommended).

### During Review

- Open a Pull Request on the repo. Add CORE UI team members as reviewers.
- Tests and linters must be passing
- Review will be thorough - problems in these components will have a widespread impact.
- If your review is completed and you don't have merge rights for main, reach out to a member of the CORE UI team or post in the [Common UI Development](https://apps.mypurecloud.com/directory/#/group/5b99076f08ece9148419013b) and one of us will get it merged.

### After Merging

- If your change added a new English localization file please create a ticket in the `LOCAL` Jira project notifying the localization team of the location of the new file. This will allow them to start creating the other language files necessary.

### Versioning

- Package version is determined at publish time through the commit types specified.
- The package will be bumped, a changelog file will be generated, the changes will be committed, and a version tag will be added

### Known Issues

- The Jest CLI short alias for updating snapshots `-u` is not working but the long form `--updateSnapshot` still is.
