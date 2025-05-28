import { newSparkE2EPage, a11yCheck } from '@test/e2eTestUtils';
import { renderConfigs } from './gux-link.common';

describe('gux-link-beta', () => {
  describe('#render', () => {
    renderConfigs.forEach(config => {
      it(config.description, async () => {
        const page = await newSparkE2EPage({ html: config.html });
        await a11yCheck(page);

        const element = await page.find('gux-link-beta');
        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
