import { action } from '@storybook/addon-actions';
import { boolean, object, select, text } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'Action Button',
  withReadme(README, () => {
    const el = document.createElement('div');
    el.innerHTML = `
          <gux-action-button text="Blop">
              <gux-list-item id="listItem1" text="test" value="test"></gux-list-item>
              <gux-list-item id="listItem2" text="test2" value="test2"></gux-list-item>
              <gux-list-item text="test3" value="test3" disabled="true"></gux-list-item>
          </gux-action-button>
      `;

    setTimeout(() => {
      document.getElementById('listItem1').addEventListener('action', i => {
        alert(`test: ${i.detail}`);
      });

      document.getElementById('listItem2').addEventListener('action', i => {
        alert(`test: ${i.detail}`);
      });
    });

    el.addEventListener('open', e => action('open')());
    el.addEventListener('close', e => action('close')());
    el.addEventListener('actionClick', e => action('actionClick')());
    el.accent = select('accent', ['primary', 'secondary'], 'secondary');
    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
    return el;
  })
);
