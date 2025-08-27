import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';
import { renderConfigs } from './gux-button-slot.common';

describe('gux-button-slot', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-button-slot');

        await a11yCheck(page);
        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
