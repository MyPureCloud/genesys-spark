import { a11yCheck, newSparkE2EPage } from '../../../../../test/e2eTestUtils';
import { renderConfig } from './gux-form-heading.common';

describe('gux-form-heading', () => {
  describe('#render', () => {
    it(renderConfig.description, async () => {
      const page = await newSparkE2EPage({ html: renderConfig.html });
      const element = await page.find('gux-form-heading');

      await a11yCheck(page);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
