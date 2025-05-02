export const renderConfigs = [
  {
    description: 'should render action toast',
    html: `
          <gux-action-toast-legacy lang="en" accent="neutral">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="title">Title</div>
            <div slot="message">This is the message</div>
            <gux-button slot="negative-button">Reject</gux-button>
            <gux-button slot="positive-button" accent="primary">Accept</gux-button>
          </gux-action-toast-legacy>
        `
  }
];
