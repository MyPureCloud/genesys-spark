export const renderConfigs = [
  ...['incomplete', 'completed', 'error'].map(status => ({
    description: `Should render as expected for "${status}" alignment`,
    html: `
        <gux-stepper-beta>
        <gux-step step-id="account-info" status="${status}">
            <gux-step-title slot="title">Account Info</gux-step-title>
            <span slot="helper">Please enter account info</span>
        </gux-step>
        </gux-stepper-beta>
    `
  })),
  {
    description: 'Should render as expected for active state',
    html: `
        <gux-stepper-beta active-step-id="account-info">
        <gux-step step-id="account-info" status="incomplete">
            <gux-step-title slot="title">Account Info</gux-step-title>
            <span slot="helper">Please enter account info</span>
        </gux-step>
        </gux-stepper-beta>
    `
  },
  {
    description: 'Should render as expected for vertical state',
    html: `
        <gux-stepper-beta orientation="vertical">
        <gux-step step-id="account-info" status="incomplete">
            <gux-step-title slot="title">Account Info</gux-step-title>
            <span slot="helper">Please enter account info</span>
        </gux-step>
        </gux-stepper-beta>
    `
  }
];
