import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'Command Palette',
  withReadme(README, () => {
    const root = document.createElement('div');
    const el = document.createElement('gux-command-palette');
    el.innerHTML = `
      <gux-command-action id="testItem" text="test" details="shows an alert" shortcut="⌘ T"></gux-command-action>
      <gux-command-action text="apple" details="a fruit" common></gux-command-action>
      <gux-command-action text="banana" recent></gux-command-action>
    `;

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

    setTimeout(() => {
      document.querySelectorAll('gux-command-action').forEach(actionItem => {
        actionItem.addEventListener('action', () => {
          action('action')(`${actionItem.text} command invoked`);
        });
      });
    });

    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';

    return root;
  })
);
