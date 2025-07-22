import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';
import { renderConfigs } from './gux-rich-text-editor.common';

describe('gux-rich-text-editor', () => {
  describe('#render', () => {
    renderConfigs.forEach(({ html }, index) => {
      it(`should display component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });

        const element = await page.find('gux-rich-text-editor-beta');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
