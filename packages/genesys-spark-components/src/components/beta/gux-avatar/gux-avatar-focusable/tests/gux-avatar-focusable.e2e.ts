import { newSparkE2EPage, a11yCheck } from '../../../../../test/e2eTestUtils';
import { renderConfigs } from './gux-avatar-focusable.common';

describe('gux-avatar', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-avatar-focusable-beta');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
