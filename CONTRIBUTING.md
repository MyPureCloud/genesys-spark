# Contributing To Common Web Components

- [Before Starting](#before-starting)
- [While Working](#while-working)
- [During Review](#during-review)

## Adding Components/Features

### Before Starting

#### For Genesys Employees

- Make sure what you're building is in the [Genesys UX Guidelines](https://intranet.genesys.com/display/UXT/Genesys+UX+Guidelines+3.0)
  - If you want something that's not in those guidelines, work with the UX team (UXTeam@genesys.com) to get it added and figure out if it needs to be common.
- Check the [Common UI Board](https://inindca.atlassian.net/projects/COMUI) in JIRA to make sure nobody else is already working on your feature.
- Create or find an issue on the [Common UI Board](https://inindca.atlassian.net/projects/COMUI) for your feature, or assign the issue to yourself.

#### For External Contributors

- Open a GitHub Issue describing the issue you are looking to solve, or the feature you'd like to add, for discussion with the maintainers.

### While Working

- Use `npm run commit` or `git cz` to ensure correctly formatted commit messages. ([Commitizen](https://github.com/commitizen/cz-cli))
- Components should follow our best practices for [Component Design](./COMPONENT_DESIGN.md)
- Components should be implemented in TypeScript, with Stencil (if you think you need to deviate from this, talk to the common UI dev team first)
- Create tests for your component
  - Use unit tests for helper utils and any JS apis on the component
  - Use pupetter e2e tests for user interactions
  - Create a [snapshot test](https://jestjs.io/docs/en/snapshot-testing) for detecting unintended markup changes
- Be sure your component meets the [Common UI Application Accessibility Guidelines](https://intranet.genesys.com/pages/viewpage.action?spaceKey=CMC&title=Common+UI+Application+Accessibility++Guidelines)
- Make sure any text generated within your component uses the `i18n` [localization tools](https://bitbucket.org/inindca/genesys-webcomponents/wiki/Localization) for string replacement.
- Each component should include a file with example usages
  - Examples should include all presentational variations
- Format your code based on the `.prettierrc.json` settings (configuring auto-format with [Prettier](prettier.io) is highly recommended).

### During Review

- Open a Pull Request on the repo. Please do not remove any of the default reviewers.
- Tests, tslint and commitlint must be passing
- Review will be thorough - problems in these components will have a widespread impact.
- If your review is completed and you don't have merge rights for master, reach out to the [Common UI Dev Team](https://apps.mypurecloud.com/directory/#/group/5b99076f08ece9148419013b) and one of us will get it merged.

### After Merging

- If your change added a new english localization file please create a ticket in the `LOCAL` Jira project notifying the localization team of the location of the new file. This will allow them to start creating the other language files necessary.

### Versioning

- Package version is determined at publish time through the commit types specified.
- The package will be bumped, a changelog file will be generated, the changes will be commited, and a version tag will be added
- The package will then be published to NPM, and pushed to bitbucket
