import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'Action Button',
  withReadme(README, () => {
    const el = document.createElement('div');
    el.innerHTML = `
          <gux-action-button text="Blop">
              <gux-action-item id="listItem1" text="test" value="test"></gux-action-item>
              <gux-action-item id="listItem2" text="test2" value="test2"></gux-action-item>
              <gux-action-item text="test3" value="test3" disabled="true"></gux-action-item>
              <gux-action-item value="slotted"><span>I am a span</span></gux-action-item>
          </gux-action-button>
      `;

    setTimeout(() => {
      document.getElementById('listItem1').addEventListener('press', i => {
        action('press')(`test1: ${i.detail}`);
      });

      document.getElementById('listItem2').addEventListener('press', i => {
        action('press')(`test2: ${i.detail}`);
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
