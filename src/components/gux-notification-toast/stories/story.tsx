import { action } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'Notification Toast',
  withReadme(README, () => {
    const el = document.createElement('div');
    render(
      html`
        <h2>Basic samples</h2>
        <br /><i>For Light Theme</i><br /><br />
        <gux-notification-toast
          toast-title="Holiday approved"
          icon="genesys-icon-calendar-generic"
          accent="neutral"
          message="Family vacation on 06/24/16 approved"
        >
        </gux-notification-toast>
        <br /><i>For Dark Theme</i><br /><br />
        <gux-notification-toast
          class="gux-dark-theme"
          toast-title="Holiday approved"
          icon="genesys-icon-calendar-generic"
          accent="neutral"
          message="Family vacation on 06/24/16 approved"
        >
        </gux-notification-toast>
        <h2>Interactive sample</h2>
        <gux-notification-toast
          id="interactive"
          toast-title=${text('toastTitle', 'title')}
          icon=${text('icon', 'genesys-icon-alert-octo')}
          accent=${select(
            'accent',
            ['neutral', 'positive', 'alert', 'warning'],
            'neutral'
          )}
          message=${text('message', 'message')}
        >
        </gux-notification-toast>
      `,
      el
    );
    setTimeout(() => {
      const it = document.getElementById('interactive');
      it.addEventListener('closeClick', e => action('closeClick')(e.detail));
    }, 100);
    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
    return el;
  })
);
