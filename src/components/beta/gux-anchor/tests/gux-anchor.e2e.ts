import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

describe('gux-anchor-beta', () => {
  describe('#render', () => {
    [
      '<gux-anchor-beta><a href="#">Default Link</a></gux-anchor-beta>',
      '<gux-anchor-beta><a href="#" target="_blank">Open in new tab</a></gux-anchor-beta>',
      '<gux-anchor-beta><a href="https://spark.genesys.com/" target="_blank">External Link</a></gux-anchor-beta>',
      '<gux-anchor-beta table="true"><a href="#">Tabel Cell Link</a></gux-anchor-beta>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-anchor-beta');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
