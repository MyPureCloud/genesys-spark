import { action } from '@storybook/addon-actions';
import { object, select, text } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'Command Palette',
  withReadme(README, () => {
    const root = document.createElement('div');
    const el = document.createElement('gux-command-palette');
    el.items = object('items', [
      {
        callback: i => {
          alert('test:' + JSON.stringify(i));
        },
        details: 'shows an alert',
        shortcut: '⌘ T',
        text: 'test',
        type: 'recent'
      },
      {
        callback: i => {
          alert('test2:' + JSON.stringify(i));
        },
        details: 'a fruit',
        text: 'apple',
        type: 'common'
      },
      {
        callback: i => {
          alert('test3:' + JSON.stringify(i));
        },
        text: 'bannana',
        type: 'common'
      }
    ]);

    const btn = document.createElement('gux-button');
    btn.text = 'Show';
    function toggleCommandPalette() {
      if (!el.visible) {
        el.open();
        btn.text = 'Hide';
      } else {
        el.close();
        btn.text = 'Show';
      }
    }
    btn.addEventListener('click', toggleCommandPalette);

    const lbl = document.createElement('span');
    lbl.textContent = ' or press ctrl + . to open and esc to close';
    root.appendChild(btn);
    root.appendChild(lbl);
    root.appendChild(el);

    document.addEventListener('keydown', e => {
      if (e.key === '.' && e.ctrlKey && !el.visible) {
        toggleCommandPalette();
      }
      if (e.key === 'Escape' && el.visible) {
        toggleCommandPalette();
      }
    });

    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';

    return root;
  })
);
