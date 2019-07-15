import { action } from '@storybook/addon-actions';
import { object, select } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'List',
  withReadme(README, () => {
    /*const el = document.createElement('gux-list');
      el.items = object('items', [
        {
          callback: i => {
            alert('test:' + JSON.stringify(i));
          },
          text: 'test'
        },
        { type: 'divider' },
        { text: 'test2' },
        { text: 'test3', isDisabled: true }
      ]);
      el.addEventListener('custom', e => action('custom')(e.detail));*/

    const el = document.createElement('div');
    el.innerHTML = `
          <gux-list>
              <gux-list-item id="listItem1" value="test"></gux-list-item>
              <gux-list-divider></gux-list-divider>
              <gux-list-item value="test2"></gux-list-item>
              <gux-list-item value="test3" disabled="true"></gux-list-item>
          </gux-list>
      `;

    setTimeout(() => {
      document.getElementById('listItem1').addEventListener('action', i => {
        alert('test:' + JSON.stringify(i));
      });
    });

    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
    return el;
  })
);
