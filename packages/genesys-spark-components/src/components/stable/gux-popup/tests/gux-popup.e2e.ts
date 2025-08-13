import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';
import { renderConfigs } from './gux-popup.common';

const axeExclusions = [];

describe('gux-popup', () => {
  renderConfigs.forEach(({ html, description }) => {
    it(description, async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-popup');
      await a11yCheck(page, axeExclusions);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
