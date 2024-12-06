import { newSparkE2EPage, a11yCheck } from '@test/e2eTestUtils';
describe('gux-link-beta', () => {
  describe('#render', () => {
    [
      `<gux-link-beta><a href="#">Link</a></gux-link-beta>`,
      `<gux-link-beta size="small"><a href="#">Link</a></gux-link-beta>`,
      `<gux-link-beta standalone><a href="#">Link</a></gux-link-beta>`,
      `<gux-link-beta size="small" standalone><a href="#">Link</a></gux-link-beta>`,
      `<gux-link-beta standalone><a href="#">Link<gux-icon icon-name="external-link" decorative></a></gux-icon></gux-link-beta>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        await a11yCheck(page);

        const element = await page.find('gux-link-beta');
        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
