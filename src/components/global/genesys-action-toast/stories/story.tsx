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
        <genesys-action-toast
         id='simple'
         toast-title='The Title'
         message='the message'
         icon='chat'
        >
        </genesys-action-toast>
        <h2>Interactive sample</h2>
        <genesys-action-toast
          id='interactive'
          toast-title=${text('toastTitle', 'The Title')}
          message=${text('message', 'message')}
          icon=${text('icon', 'chat')}
        >
        </genesys-action-toast>
      `,
        el
      );
      setTimeout(() => {
        const it = document.getElementById('interactive');
        it.addEventListener('custom', e => action('custom')(e.detail));
        const simple = document.getElementById('simple');
        simple.rightButton = {
          text: 'Accept',
          title: 'Ok',
          callback: () => {
            action('callback called')('Ok');
          }
        };
        simple.leftButton = {
          text: 'Reject',
          callback: () => {
            action('callback called')('Cancel');
          }
        };
        it.rightButton = object('rightButton', {
          text: 'Accept',
          title: 'Ok',
          callback: () => {
            action('callback called')('Ok');
          }
        });
        it.leftButton = object('leftButton', {
          text: 'Reject',
          title: 'Reject',
          callback: () => {
            action('callback called')('Reject');
          }
        });
        it.keyValues = object('keyValues', {
          name: 'value1',
          topic: 'value2'
        });

        simple.keyValues = {
          name: 'value1',
          topic: 'value2',
          LonglonglongLonglonglongLonglonglongLonglonglongLonglonglong:
            'LonglonglongLonglonglongLonglonglongLonglonglongLonglonglong'
        };
      }, 100);
      document.getElementsByTagName('html')[0].className =
        'genesys-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
  );
