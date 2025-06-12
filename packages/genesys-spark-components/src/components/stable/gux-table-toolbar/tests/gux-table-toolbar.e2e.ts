import { a11yCheck, newSparkE2EPage } from '../../../../test/e2eTestUtils';
import { renderConfigs } from './gux-table-toolbar.common';

describe('gux-table-toolbar', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ description, html }) => {
      it(description, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-table-toolbar');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
