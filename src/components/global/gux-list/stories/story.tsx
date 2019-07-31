import { action } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module).add(
  'List',
  withReadme(README, () => {
    const el = document.createElement('div');
    el.innerHTML = `
          <h3>Interactive</h3>
          <gux-list id="interactive" highlight=${text('highlight', 'te')}>
              <gux-list-item id="listItem1" value="test" text="test"></gux-list-item>
              <gux-list-divider></gux-list-divider>
              <gux-list-item id="customListItem" value="test2"><gux-text-highlight text="testing a custom element"/><i>Some detail &nbsp;</i></gux-list-item>
              <gux-list-item text="test3" value="test3" disabled="true"></gux-list-item>
          </gux-list>
          <br />
          <div>
            <span>Currently Selected Item: </span><span id="selectionDetails"/>
          </div>
      `;

    setTimeout(() => {
      document.getElementById('interactive').addEventListener('changed', c => {
        document.getElementById('selectionDetails').innerText = c.detail;
      });

      document.getElementById('listItem1').addEventListener('press', i => {
        action('press')(`test: ${i.detail}`);
      });
      document.getElementById('customListItem').addEventListener('press', i => {
        action('press')(`Custom: ${i.detail}`);
      });
    });

    document.getElementsByTagName('html')[0].className =
      'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';

    return el;
  })
);
