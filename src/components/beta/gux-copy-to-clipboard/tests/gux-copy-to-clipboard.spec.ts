import { newSpecPage } from '@stencil/core/testing';
import * as popperjs from '@popperjs/core';
import MutationObserver from 'mutation-observer';
import { GuxCopyToClipboard } from '../gux-copy-to-clipboard';

const components = [GuxCopyToClipboard];
const language = 'en';

describe('gux-copy-to-clipboard-beta', () => {
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
    it('should render copy to clipboard', async () => {
      const html = `
          <gux-copy-to-clipboard-beta>
            <span>Test</span>
          </gux-copy-to-clipboard-beta>
        `;
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxCopyToClipboard);

      expect(page.root).toMatchSnapshot();
    });
  });
});
