import { newSparkE2EPage, a11yCheck } from 'test/e2eTestUtils';

describe('#render different card variations eg(outline,outline(explicit),filled,raised)', () => {
  [
    '<gux-card-beta><span>This is a content slot</span></gux-card-beta>',
    '<gux-card-beta accent="outline"><span>This is a content slot</span></gux-card-beta>',
    '<gux-card-beta accent="raised"><span>This is a content slot</span></gux-card-beta>',
    '<gux-card-beta accent="filled"><span>This is a content slot</span></gux-card-beta>'
  ].forEach((html, index) => {
    it(`should render component as expected (${index + 1})`, async () => {
      const page = await newSparkE2EPage({ html });
      const element = await page.find('gux-card-beta');

      await a11yCheck(page);

      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
