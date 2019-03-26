import { action } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme  } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Genesys Components', module)
.add(
    'Genesys Single Panel',
    withReadme(README, () => {
      const el = document.createElement('div');
      render(html`
        <h2>Basic samples</h2>
          <gux-panel-frame>
            <gux-panel-header>
              <div style="display: flex; justify-content: flex-end; align-items: center">
                <h2 style="margin-right: auto">Find Events</h2>
              </div>
            </gux-panel-header>
            <gux-panel-body>
              <div style="display: flex">
                <gux-text-field/>
                <gux-rating/>
                <gux-text-field/>
                <gux-toggle/>
              </div>
            </gux-panel-body>
            <gux-panel-footer>
              <gux-panel-footer-position>
                <gux-button text="Close"/>
              </gux-panel-footer-position>
              <gux-panel-footer-position position="right">
                <gux-button text="Accept" accent="primary"/>
              </gux-panel-footer-position>
            </gux-panel-footer>
          </gux-panel-frame>
        <h2>Interactive sample</h2>
      `, el);
      document.getElementsByTagName('html')[0].className =
        'gux-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
);
