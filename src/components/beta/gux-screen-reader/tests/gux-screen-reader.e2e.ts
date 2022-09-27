import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

describe('gux-screen-reader-beta', () => {
  describe('#render', () => {
    it('should render component as expected', async () => {
      const html = `
        <gux-screen-reader-beta>
          This is content
        </gux-screen-reader-beta>
      `;
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-screen-reader-beta');
      await a11yCheck(page);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
