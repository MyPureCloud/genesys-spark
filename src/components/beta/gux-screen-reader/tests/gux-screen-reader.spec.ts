import { newSpecPage } from '@stencil/core/testing';
import { GuxScreenReader } from '../gux-screen-reader';

const components = [GuxScreenReader];
const language = 'en';

describe('gux-screen-reader-beta', () => {
  describe('#render', () => {
    it('should render component as expected', async () => {
      const html = `
        <gux-screen-reader-beta>
          This is content
        </gux-screen-reader-beta>
      `;
      const page = await newSpecPage({ components, html, language });

      expect(page.root).toMatchSnapshot();
    });
  });
});
