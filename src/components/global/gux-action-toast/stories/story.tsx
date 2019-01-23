import { checkA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import {
  object,
  select,
  text,
  withKnobs
} from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Genesys Components', module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add(
    'Genesys Action Toast',
    withReadme(README, () => {
      const el = document.createElement('div');
      render(
        html`
        <h2>Basic samples</h2>
        <gux-action-toast
         id='simple'
         toast-title='The Title'
         message='the message'
         icon='genesys-icon-chat'
        >
        </gux-action-toast>
        <h2>Interactive sample</h2>
        <gux-action-toast
          id='interactive'
          toast-title=${text('toastTitle', 'The Title')}
          message=${text('message', 'message')}
          subject=${text('subject', '')}
          icon=${text('icon', 'genesys-icon-chat')}
        >
        </gux-action-toast>
      `,
        el
      );
      setTimeout(() => {
        const it = document.getElementById('interactive');
        it.addEventListener('custom', e => action('custom')(e.detail));
        const simple = document.getElementById('simple');
        simple.primaryButton = {
          callback: () => {
            action('callback called')('Ok');
          },
          text: 'Accept',
          title: 'Ok'
        };
        simple.secondaryButton = {
          callback: () => {
            action('callback called')('Cancel');
          },
          text: 'Reject'
        };
        it.primaryButton = object('rightButton', {
          callback: () => {
            action('callback called')('Ok');
          },
          text: 'Accept',
          title: 'Ok'
        });
        it.secondaryButton = object('leftButton', {
          callback: () => {
            action('callback called')('Reject');
          },
          text: 'Reject',
          title: 'Reject'
        });
        it.keyValues = object('keyValues', {
          name: 'value1',
          topic: 'value2'
        });

        simple.keyValues = {
          LonglonglongLonglonglongLonglonglongLonglonglongLonglonglong:
            'LonglonglongLonglonglongLonglonglongLonglonglongLonglonglong',
          name: 'value1',
          topic: 'value2'
        };
      }, 100);
      document.getElementsByTagName('html')[0].className =
        'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
  );
