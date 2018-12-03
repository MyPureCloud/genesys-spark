import { checkA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs/polymer';
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
              <genesys-button text="Top Left"></genesys-button>
              <genesys-tooltip
                text='Top left tooltip that goes on bottom, and fixed on the left'>
              </genesys-tooltip>
            </div>
            <div>
              <genesys-button text="Top Right"></genesys-button>
              <genesys-tooltip
                text='Top right tooltip that goes on bottom, and fixed on the right'>
              </genesys-tooltip>
            </div>
          </div>
          <div style="display:flex;flex-grow:1;flex-direction:column">
            <div id="scroll" style="margin-top:150px;height:300px;overflow-y:scroll;overflow-x:hidden;border:2px dashed grey">
              <div id="scroll2" style="margin:100px -2px;height:150px;overflow-y:scroll;border:2px dashed grey">
                <div style="height:200px;text-align:center">
                  <div style="display:inline-block;margin-top:84px;">
                    <genesys-button text="Scroll"></genesys-button>
                    <genesys-tooltip
                      text='Tooltip should move on scroll'
                      delay='0'
                      is-shown='true'>
                    </genesys-tooltip>
                  </div>
                </div>
              </div>
            </div>
            <div style="margin:auto">
              <genesys-button id="center-button" text="Interactive" accent="primary"></genesys-button>
              <genesys-button id="center-button-show" text="Show"></genesys-button>
              <genesys-button id="center-button-hide" text="Hide"></genesys-button>
            </div>
          </div>
          <div style="display:flex;justify-content:space-between">
            <div>
              <genesys-button text="Bottom Left"></genesys-button>
              <genesys-tooltip
                text='Bottom left tooltip that goes on top, and fixed on the left'>
              </genesys-tooltip>
            </div>
            <div>
              <genesys-button text="Bottom Right"></genesys-button>
              <genesys-tooltip
                text='Bottom right tooltip that goes on top, and fixed on the right'>
              </genesys-tooltip>
            </div>
          </div>
        </div>

        <genesys-tooltip
          id="interactive"
          text=${text('text', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo molestias facere ab deserunt dolores, recusandae non consequuntur quia perferendis officia vero maiores voluptatem temporibus veritatis, fugit nihil, id nobis at.')}
          for=${text('for', 'center-button')}
          delay=${number('delay', 0)},
          is-shown=${boolean('isShown', true)}>
        </genesys-tooltip>
      `, el);
      setTimeout(() => {
        const centerTooltip = document.getElementById('interactive');
        centerTooltip.addEventListener('shown', e => action('shown')(e));
        centerTooltip.addEventListener('hidden', e => action('hidden')(e));
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
