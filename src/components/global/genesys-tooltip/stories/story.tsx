import { checkA11y } from '@storybook/addon-a11y';
import { select, text, withKnobs } from '@storybook/addon-knobs/polymer';
import { storiesOf } from '@storybook/polymer';
import { html, render } from 'lit-html';
import { withReadme  } from 'storybook-readme';

import README from '../readme.md';

storiesOf('Genesys Components', module)
.addDecorator(withKnobs)
.addDecorator(checkA11y)
.add(
    'Genesys Tooltip',
    withReadme(README, () => {
      const el = document.createElement('div');
      render(html`
        <div style="width:100%">
          <div id="toto" class="hover-container" style="display:inline-block">
            <button>Left button</button>
            <genesys-tooltip
              text=${text('text', 'Left tooltip')}>
            </genesys-tooltip>
          </div>
        </div>
        <div style="width:100%;text-align:right">
          <div class="hover-container" style="display:inline-block">
            <button>Right button</button>
            <genesys-tooltip
              text=${text('text', 'Right tooltip')}>
            </genesys-tooltip>
          </div>
        </div>
        <div style="width:100%;text-align:center">
          <div class="hover-container" style="display:inline-block">
            <button id="center-button">Center button</button>
          </div>
        </div>
        <genesys-tooltip
          text=${text('text', 'Center tooltip')}
          parent=${text('text', '#center-button')}>
        </genesys-tooltip>
      `, el);
      document.getElementsByTagName('html')[0].className = 'genesys-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
);
