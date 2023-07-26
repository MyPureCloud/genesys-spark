import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

describe('#render different card accents', () => {
  [
    '<gux-card><span>This is a content slot</span></gux-card>',
    '<gux-card accent="bordered"><span>This is a content slot</span></gux-card>',
    '<gux-card accent="raised"><span>This is a content slot</span></gux-card>',
    '<gux-card accent="borderless"><span>This is a content slot</span></gux-card>'
  ].forEach((html, index) => {
    it(`should render component as expected (${index + 1})`, async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-card');

      await a11yCheck(page);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
