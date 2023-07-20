import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';
import { GuxCopyToClipboard } from '../gux-copy-to-clipboard';

const components = [GuxCopyToClipboard];
const language = 'en';

const html = `
  <gux-copy-to-clipboard-beta>
    <div slot="content">Test</div>
  </gux-copy-to-clipboard-beta>
`;

describe('gux-copy-to-clipboard-beta', () => {
  beforeEach(async () => {
    global.MutationObserver = MutationObserver;
  });

  describe('#render', () => {
    it('should render copy to clipboard', async () => {
      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxCopyToClipboard);

      expect(page.root).toMatchSnapshot();
    });
  });

  describe('private', () => {
    it('should copy to clipboard successfully', async () => {
      const page = await newSpecPage({ components, html, language });
      const component = new GuxCopyToClipboard();

      Object.assign(window.navigator, {
        clipboard: {
          writeText: jest.fn().mockImplementation(() => Promise.resolve())
        }
      });

      component.onCopyToClipboard();
      await page.waitForChanges();

      expect(component.tooltipContent).toEqual('copySuccess');
      expect(window.navigator.clipboard.writeText).toHaveBeenCalled();
    });

    it('should copy to clipboard with error', async () => {
      const page = await newSpecPage({ components, html, language });
      const component = new GuxCopyToClipboard();

      Object.assign(window.navigator, {
        clipboard: {
          writeText: jest.fn().mockImplementation(() => Promise.reject())
        }
      });

      component.onCopyToClipboard();
      await page.waitForChanges();

      expect(component.tooltipContent).toEqual('copyFailure');
      expect(window.navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });
});
