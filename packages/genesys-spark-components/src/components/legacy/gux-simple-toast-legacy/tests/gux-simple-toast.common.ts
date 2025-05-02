export const renderConfigs = [
  {
    description: 'should render neutral simple toast',
    html: `
      <gux-simple-toast-legacy accent="neutral">
        <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
        <div slot="message">This is the message</div>
      </gux-simple-toast-legacy>
    `
  },
  {
    description: 'should render positive simple toast',
    html: `
      <gux-simple-toast-legacy accent="positive">
        <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
        <div slot="message">This is the message</div>
      </gux-simple-toast-legacy>
    `
  },
  {
    description: 'should render alert simple toast',
    html: `
      <gux-simple-toast-legacy accent="alert">
        <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
        <div slot="message">This is the message</div>
      </gux-simple-toast-legacy>
    `
  },
  {
    description: 'should render warning simple toast',
    html: `
      <gux-simple-toast-legacy accent="warning">
        <gux-icon slot="icon" icon-name="user-add" decorative></gux-icon>
        <div slot="message">This is the message</div>
      </gux-simple-toast-legacy>
    `
  }
];

export const renderConfig = renderConfigs[0];
