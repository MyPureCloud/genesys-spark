import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';
import { renderConfigs } from './gux-month-picker.common';

const axeExclusions = [];

describe('gux-month-picker-beta', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-month-picker-beta');

        await a11yCheck(page, axeExclusions);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
