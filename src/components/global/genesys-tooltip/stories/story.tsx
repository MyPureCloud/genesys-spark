import { checkA11y } from '@storybook/addon-a11y';
import { number, select, text, withKnobs } from '@storybook/addon-knobs/polymer';
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
        <div style="position:absolute;top:0;bottom:0;left:0;right:0;display:flex;flex-direction:column">
          <div style="display:flex;justify-content:space-between">
            <div>
              <button>Top left</button>
              <genesys-tooltip
                text='Top left tooltip that goes on bottom, and fixed on the left'>
              </genesys-tooltip>
            </div>
            <div>
              <button>Right button</button>
              <genesys-tooltip
                text='Top right tooltip that goes on bottom, and fixed on the right'>
              </genesys-tooltip>
            </div>
          </div>
          <div style="display:flex;flex-grow:1">
            <div style="margin:auto">
              <button id="center-button">Center button</button>
              <button id="center-button-show">Show</button>
              <button id="center-button-hide">Hide</button>
            </div>
          </div>
          <div style="display:flex;justify-content:space-between">
            <div>
              <button>Bottom left button</button>
              <genesys-tooltip
                text='Bottom left tooltip that goes on top, and fixed on the left'>
              </genesys-tooltip>
            </div>
            <div>
              <button>Bottom right button</button>
              <genesys-tooltip
                text='Bottom right tooltip that goes on top, and fixed on the right'>
              </genesys-tooltip>
            </div>
          </div>
        </div>

        <genesys-tooltip
          id="interactive"
          text=${text('text', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo molestias facere ab deserunt dolores, recusandae non consequuntur quia perferendis officia vero maiores voluptatem temporibus veritatis, fugit nihil, id nobis at.')}
          parent=${text('parent', '#center-button')}
          timeout=${number('timeout', 0)}>
        </genesys-tooltip>
      `, el);
      setTimeout(() => {
        const centerTooltip = document.getElementById('interactive');
        const showTooltip = document.getElementById('center-button-show');
        showTooltip.addEventListener('click', () => {
          centerTooltip.show();
        });
        const hideTooltip = document.getElementById('center-button-hide');
        hideTooltip.addEventListener('click', () => {
          centerTooltip.hide();
        });
      }, 100);
      document.getElementsByTagName('html')[0].className = 'genesys-' + select('theme', ['dark', 'default'], 'default') + '-theme';
      return el;
    })
);
