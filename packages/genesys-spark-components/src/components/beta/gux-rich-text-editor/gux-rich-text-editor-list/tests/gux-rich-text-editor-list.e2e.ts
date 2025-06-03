import { newSparkE2EPage, a11yCheck } from '@test/e2eTestUtils';
import { renderConfigs } from './gux-rich-text-editor-list.common';

describe('gux-rich-text-editor-list', () => {
  renderConfigs.forEach(({ description, html }) => {
    it(description, async () => {
      const page = await newSparkE2EPage({ html });

      const element = await page.find('gux-rich-text-editor-list');

      await a11yCheck(page);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
