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
    description: 'Should render as expected for vertical orientation',
    html: `
        <gux-stepper-beta orientation="vertical">
        <gux-step step-id="account-info" status="incomplete">
            <gux-step-title slot="title">Account Info</gux-step-title>
            <span slot="helper">Please enter account info</span>
        </gux-step>
        </gux-stepper-beta>
    `
  },
  {
    description: 'Should render as expected for a stepper with 4 steps',
    html: `
      <gux-stepper-beta active-step-id="account-info">
        <gux-step step-id="account-info" status="completed">
          <gux-step-title slot="title">Account Info</gux-step-title>
          <span slot="helper">Please enter account info</span>
        </gux-step>
        <gux-step step-id="personal-info" status="error">
          <gux-step-title slot="title">Personal Info</gux-step-title>
          <span slot="helper">Please enter personal info</span>
        </gux-step>
        <gux-step step-id="maintenance" status="incomplete">
          <gux-step-title slot="title">Maintenance</gux-step-title>
        </gux-step>
        <gux-step step-id="verification" status="incomplete">
          <gux-step-title slot="title">Verification</gux-step-title>
        </gux-step>
      </gux-stepper-beta>
    `
  }
];
