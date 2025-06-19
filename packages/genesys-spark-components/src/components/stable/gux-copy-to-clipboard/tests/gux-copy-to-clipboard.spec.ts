import { newSpecPage } from '@test/specTestUtils';
import { GuxCopyToClipboard } from '../gux-copy-to-clipboard';

const components = [GuxCopyToClipboard];
const language = 'en';

const html = `
  <gux-copy-to-clipboard>
    <div slot="content">Test</div>
  </gux-copy-to-clipboard>
`;

describe('gux-copy-to-clipboard', () => {
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

      Object.assign(global.navigator, {
        clipboard: {
          writeText: jest.fn().mockImplementation(() => Promise.resolve())
        }
      });

      await (component as any).onCopyToClipboard();

      expect(component.tooltipContent).toEqual('copySuccess');
      expect(global.navigator.clipboard.writeText).toHaveBeenCalled();
    });

    it('should copy to clipboard with error', async () => {
      const component = new GuxCopyToClipboard();

      Object.assign(global.navigator, {
        clipboard: {
          writeText: jest
            .fn()
            .mockImplementation(() => Promise.reject(new Error()))
        }
      });

      await (component as any).onCopyToClipboard();

      expect(component.tooltipContent).toEqual('copyFailure');
      expect(global.navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });
});
