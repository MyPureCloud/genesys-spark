import { newSpecPage } from '@stencil/core/testing';
import * as popperjs from '@popperjs/core';
import MutationObserver from 'mutation-observer';
import { GuxPopover } from '../gux-popover';

const components = [GuxPopover];
const language = 'en';

describe('gux-popover', () => {
  beforeEach(async () => {
    global.MutationObserver = MutationObserver;
    // popperjs does not work with Stencils MockHTMLElements used in tests
    jest.spyOn(popperjs, 'createPopper').mockReturnValue({
      destroy: jest.fn()
    } as unknown as popperjs.Instance);
  });

  afterEach(async () => {
    jest.spyOn(popperjs, 'createPopper').mockRestore();
  });

  describe('#render', () => {
    [
      {
        description: 'should render popover',
        html: `
          <div>
            <div id="popover-target">
              Example Element
            </div>
            <gux-popover id="popover-example" position="top" for="popover-target">
              <div>popover content</div>
            </gux-popover>
          </div>
        `
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxPopover);

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
