# Contributing To Genesys Spark Repo

- [Before Starting](#before-starting)
- [Running Locally](#running-locally)
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

### Running Locally

To run the components locally, install dependencies:

`npm ci`

Run an initial build to bootstrap tokens and other artifacts. This is only required once after
switching branches or pulling changes:

`npm run build`

Start the dev server:

`npm start`

### Writing Commit Messages

Writing descriptive and informative commit messages will help both contributors to the project and consumers of the Genesys Spark package.

Commit messages

- Use `npm run commit`to ensure correctly formatted commit messages. ([git-cz](https://github.com/streamich/git-cz)). This will run the `git-cz` CLI. There will be various prompts to guide you through the commit writing process.
  1. Select the type of change:

```
  feat:       A new feature (minor version bump and adds commit message to CHANGELOG)
  fix:        A bug fix (minor version bump and adds commit message to CHANGELOG)
  test:       Adding missing tests
  chore:      Build process or auxiliary tool changes
  docs:       Documentation only changes
  refactor:   A code change that neither fixes a bug or adds a feature
  style:      Markup, white-space, formatting, missing semi-colons...
  ci:         CI related changes
  perf:       A code change that improves performance
```

The type of change that is selected will affect the changelog and version bumps. `feat` and `fix` commits will add a line to the changelog and will result in a minor version bump. When using `feat` or `fix` commits, only select this type of change for one commit per branch. Use another change type for additional commits (such as chore) or rebase your branch before merging. Multiple commits with `feat` or `fix` commits will add multiple lines to the changelog, which adds clutter.

2. Select the type of scope of the change

Select from a list of all the components in the component library. If you change is something other than one of the components, select 'other'

3. Write a short, imperative mood description of the change

In other words, write your commit message like it is giving an instruction or order. Example of an imperative mood commit that describes a fix to a toggle button:

Imperative mood:
`Add screen reader text to toggle button`

Not:
`Adding screen reader text to toggle button`
`Added screen reader text to toggle button`

4. Provide a longer description of the change (optional)

5. Issues that this commit closes (optional)
   Add the JIRA issue number that relates to this commit, if applicable

### While Working

- Components should follow our best practices for [Component Design](/packages/genesys-spark-components/documentation/COMPONENT_DESIGN.md)
- Components should be implemented in TypeScript, with Stencil (if you think you need to deviate from this, talk to the common UI dev team first)
- Create tests for your component
  - Use unit tests for helper utils and any JS APIs on the component
  - Use [Puppeteer](https://developers.google.com/web/tools/puppeteer) e2e tests for user interactions
  - Create a [snapshot test](https://jestjs.io/docs/en/snapshot-testing) for detecting unintended markup changes
  - Be sure your component meets the [Testing and Building Accessible Components Guidelines](/packages/genesys-spark-components/documentation/A11Y_TESTING.md)
- [Make sure any text generated within your component uses the `i18n` localization tools for string replacement](/packages/genesys-spark-components/documentation/COMPONENT_LOCALIZATION.md). Refer to the [Genesys Cloud Localization Process](https://intranet.genesys.com/display/Localization/Genesys+Cloud+Localization+Process) for more information about the localization process.
- Each component should include a file with example usages
  - Examples should include all presentational variations
- Format your code based on the `.prettierrc.json` settings (configuring auto-format with [Prettier](https://prettier.io/) is highly recommended).

### During Review

- Open a Pull Request on the repo. GitHub actions will automatically assign Core UI reviewers.
- Tests and linters must be passing
- Review will be thorough - problems in these components will have a widespread impact.
- If your review is completed and you don't have merge rights for main, reach out to a member of the Core UI team or post in the [Common UI Development](https://apps.mypurecloud.com/directory/#/group/5b99076f08ece9148419013b) and one of us will get it merged.

### Versioning

- Package version is determined at publish time through the commit types specified.
- The package will be bumped, a changelog file will be generated, the changes will be committed, and a version tag will be added

### Known Issues

- The Jest CLI short alias for updating snapshots `-u` is not working but the long form `--updateSnapshot` still is.
