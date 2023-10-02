import { newSpecPage } from '@test/specTestUtils';
import MutationObserver from 'mutation-observer';
import { GuxCopyToClipboard } from '../gux-copy-to-clipboard';

const components = [GuxCopyToClipboard];
const language = 'en';

const html = `
  <gux-copy-to-clipboard>
    <div slot="content">Test</div>
  </gux-copy-to-clipboard>
`;

describe('gux-copy-to-clipboard', () => {
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
      const component = new GuxCopyToClipboard();

      Object.assign(window.navigator, {
        clipboard: {
          writeText: jest.fn().mockImplementation(() => Promise.resolve())
        }
      });

      await (component as any).onCopyToClipboard();

      expect(component.tooltipContent).toEqual('copySuccess');
      expect(window.navigator.clipboard.writeText).toHaveBeenCalled();
    });

    it('should copy to clipboard with error', async () => {
      const component = new GuxCopyToClipboard();

      Object.assign(window.navigator, {
        clipboard: {
          writeText: jest.fn().mockImplementation(() => Promise.reject())
        }
      });

      await (component as any).onCopyToClipboard();

      expect(component.tooltipContent).toEqual('copyFailure');
      expect(window.navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });
});
