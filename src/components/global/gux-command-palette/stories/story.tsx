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
      <gux-command-action text="Dial Extension" details="John Smith (Company Directory)" shortcut="⌘ T"></gux-command-action>
      <gux-command-action text="Dial Business Phone" details="John Smith (Company Directory)" shortcut="⌥ T"></gux-command-action>
      <gux-command-action text="Dial Business Phone 2" shortcut="⌥ B"></gux-command-action>
      <gux-command-action text="Dial Pager" shortcut="⌃ T"></gux-command-action>
      <gux-command-action text="Dial Home Phone" details="John Smith (Company Directory)"></gux-command-action>
      <gux-command-action text="apple" details="a fruit." common></gux-command-action>
      <gux-command-action text="banana" recent></gux-command-action>
    `;

    const btn = document.createElement('gux-button');
    let visible = false;
    btn.text = 'Show';
    function toggleCommandPalette() {
      if (!visible) {
        el.open();
        btn.text = 'Hide';
      } else {
        el.close();
        btn.text = 'Show';
      }

      visible = !visible;
    }
    btn.addEventListener('click', toggleCommandPalette);

    const lbl = document.createElement('span');
    lbl.textContent = ' or press ctrl + . to open and esc to close';
    root.appendChild(btn);
    root.appendChild(lbl);
    root.appendChild(el);

    document.addEventListener('keydown', e => {
      if (e.key === '.' && e.ctrlKey && !visible) {
        toggleCommandPalette();
      }
      if (e.key === 'Escape' && visible) {
        toggleCommandPalette();
      }
    });

    setTimeout(() => {
      document.querySelectorAll('gux-command-action').forEach(actionItem => {
        actionItem.addEventListener('press', () => {
          action('press')(`${actionItem.text} command invoked`);
          setTimeout(toggleCommandPalette);
        });
      });
    });

    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';

    return root;
  })
);
