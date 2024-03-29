import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-label-info-beta', () => {
  describe('#render', () => {
    it(`should render component as expected`, async () => {
      const html = `
        <gux-label-info-beta>
          <span slot="content">This is an information tooltip</span>
        </gux-label-info-beta>
        `;
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-label-info-beta');

      await element.hover();
      await a11yCheck(page);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
