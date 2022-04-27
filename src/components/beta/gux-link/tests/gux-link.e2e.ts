import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

describe('gux-link-beta', () => {
  describe('#render', () => {
    [
      '<gux-link-beta href="#" link-text="Enabled Link"></gux-link-beta>',
      '<gux-link-beta href="#" link-text="Open in new tab" target="_blank"></gux-link-beta>',
      '<gux-link-beta href="#" link-text="External Link" is-external-link="true" target="_blank"></gux-link-beta>',
      '<gux-link-beta href="#" link-text="Table Cell Link" table-cell-link="true"></gux-link-beta>'
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-link-beta');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
