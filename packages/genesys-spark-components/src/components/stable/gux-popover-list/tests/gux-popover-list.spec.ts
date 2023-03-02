import { newSpecPage } from '@stencil/core/testing';
import * as popperjs from '@popperjs/core';
import MutationObserver from 'mutation-observer';
import { GuxPopoverList } from '../gux-popover-list';

const components = [GuxPopoverList];
const language = 'en';

describe('gux-popover-list', () => {
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
            <gux-popover-list id="popover-example" position="top" for="popover-target">
              <div>popover content</div>
            </gux-popover-list>
          </div>
        `
      }
    ].forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxPopoverList);

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
