import { action } from '@storybook/addon-actions';
import { object, select, text } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'Command Palette',
  withReadme(README, () => {
    const el = document.createElement('gux-command-palette');
    el.recentItems = object('recentItems', [
      {
        callback: i => {
          alert('test:' + JSON.stringify(i));
        },
        text: 'test'
      }
    ]);
    el.allItems = object('allItems', [
      {
        callback: i => {
          alert('test:' + JSON.stringify(i));
        },
        shortcut: '⌘ T',
        text: 'test'
      },
      {
        callback: i => {
          alert('test2:' + JSON.stringify(i));
        },
        text: 'apple'
      },
      {
        callback: i => {
          alert('test3:' + JSON.stringify(i));
        },
        text: 'bannana'
      }
    ]);
    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
    return el;
  })
);
