import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-icon-tooltip-beta', () => {
  describe('#render', () => {
    it(`should render component as expected`, async () => {
      const html = `
          <gux-icon-tooltip-beta icon-name="fa/bell-regular">
            <span slot="content">This is some tooltip text</span>
          </gux-icon-tooltip-beta>
        `;
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-icon-tooltip-beta');

      await element.hover();
      await a11yCheck(page);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
