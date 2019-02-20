# Contributing To Common Web Components

- [Before Starting](#before-starting)
- [While Working](#while-working)
- [During Review](#during-review)

## Adding Components/Features


### Before Starting

- Make sure what you're building is in the [Genesys UX Guidelines](https://intranet.genesys.com/display/UXT/Genesys+UX+Guidelines+3.0)
    - If you want something that's not in those guidelines, work with the UX team (UXTeam@genesys.com) to get it added and figure out if it needs to be common.
- Check the [Common UI Board](https://inindca.atlassian.net/projects/COMUI) in JIRA to make sure nobody else is already working on your feature.
- Create or find an issue on the [Common UI Board](https://inindca.atlassian.net/projects/COMUI) for your feature, or assign the issue to yourself.

### While Working

- Components should be implemented in TypeScript, with Stencil (if you think you need to deviate from this, talk to the common UI dev team first)
- Make sure to create unit tests for your component
- Be sure your component will meet the [Common UI Application Accessibility Guidelines](https://intranet.genesys.com/pages/viewpage.action?spaceKey=CMC&title=Common+UI+Application+Accessibility++Guidelines)
- Make sure any text generated within your component uses the `i18n` localization tools for string replacement.
- Each Component should have thorough Storybook documentation with clear examples of its usage and feature.
- Format your code based on the `.prettierrc.json` settings (configuring auto-format with [Prettier](prettier.io) is highly recommended).

### During Review

- Make sure you've properly bumped the version in package.json
    - API breaking changes or design overhauls that could impact surrounding layout should be a major bump (try to avoid these)
    - Addition of features or components should be a minor version bump
    - Fixes and other changes that don't impact the API should be a minor bump (the build can do this automatically)
- Open a Pull Request on the repo. Please do not remove any of the default reviewers.
- All submissions should be reviewed by at least 1 Common UI team member from each of Pure Cloud, Pure Connect, and Pure Engage.
- Tests and tslint must be passing
- Review should be thorough - problems in these components will have a widespread impact.
- If your review is completed and you don't have merge rights for master, reach out to the [Common UI Dev Team](https://apps.mypurecloud.com/directory/#/group/5b99076f08ece9148419013b) and one of us will get it merged.
