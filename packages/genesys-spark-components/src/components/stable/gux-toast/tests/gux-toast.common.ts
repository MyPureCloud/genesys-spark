export const renderConfigs = [
  {
    description: 'should render success toast',
    html: `
      <div aria-live="polite">
        <gux-toast toast-type="success">
          <div slot="title">Success Example with Link</div>
          <div slot="message">This is an example message</div>
          <a slot="link" href="#">Link</a>
        </gux-toast>
      </div>
    `
  },
  {
    description: 'should render warning toast',
    html: `
      <div aria-live="polite">
        <gux-toast toast-type="warning">
          <div slot="title">Warning Example with Link</div>
          <div slot="message">This is an example message</div>
          <a slot="link" href="#">Link</a>
        </gux-toast>
      </div>
    `
  },
  {
    description: 'should render error toast',
    html: `
      <div aria-live="polite">
        <gux-toast toast-type="error">
          <div slot="title">Error Example with Link</div>
          <div slot="message">This is an example message</div>
          <a slot="link" href="#">Link</a>
        </gux-toast>
      </div>
    `
  },
  {
    description: 'should render info toast',
    html: `
      <div aria-live="polite">
        <gux-toast toast-type="info">
          <div slot="title">Info Example with Link</div>
          <div slot="message">This is an example message</div>
          <a slot="link" href="#">Link</a>
        </gux-toast>
      </div>
    `
  },
  {
    description: 'should render action toast',
    html: `
      <div aria-live="polite">
        <gux-toast toast-type="action">
          <gux-icon slot="icon" icon-name="fa/diamond-regular" decorative></gux-icon>
          <div slot="title">2 Actions</div>
          <div slot="message">This is an example message</div>
          <button slot="primary-button" type="button" onclick="notify(event)">
            Action 1
          </button>
          <button slot="secondary-button" type="button" onclick="notify(event)">
            Action 2
          </button>
        </gux-toast>
      </div>
    `
  },
  {
    description: 'should render toast with a long message',
    html: `
      <div aria-live="polite">
        <gux-toast toast-type="success">
          <div slot="title">Success Example with Link</div>
          <div slot="message">This is an example message that is longer thatn a single line</div>
          <a slot="link" href="#">Link</a>
        </gux-toast>
      </div>
    `
  },
  {
    description: 'should render toast with a long word in the message',
    html: `
      <div aria-live="polite">
        <gux-toast toast-type="success">
          <div slot="title">Success Example with Link</div>
          <div slot="message">accountswitcherdcatestuser2@accountswitcherdca.test account successfully removed</div>
          <a slot="link" href="#">Link</a>
        </gux-toast>
      </div>
    `
  }
];

export const renderConfig = renderConfigs[0];
