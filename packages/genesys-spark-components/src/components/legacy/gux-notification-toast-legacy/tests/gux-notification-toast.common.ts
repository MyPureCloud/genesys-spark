export const renderConfigs = [
  {
    description: 'should render neutral notification toast',
    html: `
          <gux-notification-toast-legacy lang="en" accent="neutral">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="title">Title</div>
            <div slot="message">This is the message</div>
          </gux-notification-toast-legacy>
        `
  },
  {
    description: 'should render positive notification toast',
    html: `
          <gux-notification-toast-legacy lang="en" accent="positive">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="title">Title</div>
            <div slot="message">This is the message</div>
          </gux-notification-toast-legacy>
        `
  },
  {
    description: 'should render alert notification toast',
    html: `
          <gux-notification-toast-legacy lang="en" accent="alert">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="title">Title</div>
            <div slot="message">This is the message</div>
          </gux-notification-toast-legacy>
        `
  },
  {
    description: 'should render warning notification toast',
    html: `
          <gux-notification-toast-legacy lang="en" accent="warning">
            <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
            <div slot="title">Title</div>
            <div slot="message">This is the message</div>
          </gux-notification-toast-legacy>
        `
  }
];

export const renderConfig = renderConfigs[0];
