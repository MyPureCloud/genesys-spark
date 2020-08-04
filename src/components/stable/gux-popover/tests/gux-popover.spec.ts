import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';
import { GuxPopover } from '../gux-popover';

const components = [GuxPopover];
const language = 'en';

describe('gux-popover', () => {
  beforeEach(async () => {
    global.MutationObserver = MutationObserver;
    console.error = jest.fn();
  });

  afterEach(async () => {
    // The error log and some Unhandled Promise Rejection Warnings are related to the fact newSpecPage uses MockHTMLElements not HTMLElements whicj popper.js does not like.
    expect(console.error).toHaveBeenCalledWith(
      'Popper: "arrow" element must be an HTMLElement (not an SVGElement). To use an SVG arrow, wrap it in an HTMLElement that will be used as the arrow.'
    );
    expect(console.error).toHaveBeenCalledWith(
      'Popper: "arrow" modifier\'s `element` must be a child of the popper element.'
    );
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
