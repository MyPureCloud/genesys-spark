import { action } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Basic Components', module)
  .add(
    'Disclosure Button',
    withReadme(README, () => {
      const el = document.createElement('div');
      render(
        html`
        <div style='position:absolute;top:0;bottom:0;left:0;right:0;padding-right:8px;padding-left:8px;'>
        <h2>Basic samples</h2>
        <i>Position right</i><br/><br/>
          <div style='height:100px; width: 100%;'>
            <gux-disclosure-button position='right'>
              <p slot='panel-content'>This panel opens up from the right side.</p>
            </gux-disclosure-button>
          </div>
          <br/><i>Position left</i><br/><br/>
          <div style='height: 100px; width: 100%;'>
            <gux-disclosure-button>
              <p slot='panel-content'>This panel opens up from the left side.</p>
            </gux-disclosure-button>
          </div>
            <h2>Interactive sample</h2>
          <div style='height: 100px; width: 100%;'>
            <gux-disclosure-button id='interactive'
            position = ${text('position', 'left')}
            label = ${text('label', 'open')}>
              <p slot='panel-content'>This panel will contain your custom content by placing it in a <div slot='panel-content></div>'</p>
            </gux-disclosure-button>
          </div>
        </div>
      `,
        el
      );
      setTimeout(() => {
        const it = document.getElementById('interactive');
        it.addEventListener('active', e => action('active')(e.detail));
      }, 100);
      document.getElementsByTagName('html')[0].className =
        'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
  );
