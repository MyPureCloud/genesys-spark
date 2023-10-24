import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('gux-list', () => {
  describe('#render', () => {
    it('should render component as expected', async () => {
      const html = `
        <gux-list>
          <gux-list-item>Test1</gux-list-item>
          <gux-list-divider></gux-list-divider>
          <gux-list-item>Test2</gux-list-item>
          <gux-list-item>Test3</gux-list-item>
          <gux-list-item>Test4</gux-list-item>
        </gux-list>
      `;
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-list');
      await a11yCheck(page);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
