import { a11yCheck, newSparkE2EPage } from '../../../../../test/e2eTestUtils';
import { renderConfigs } from './gux-form-footer.common';

describe('gux-form-footer', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-form-footer');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
