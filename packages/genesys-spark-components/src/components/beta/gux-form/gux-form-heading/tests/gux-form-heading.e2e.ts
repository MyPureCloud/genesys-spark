import { a11yCheck, newSparkE2EPage } from '../../../../../test/e2eTestUtils';

describe('gux-form-heading', () => {
  describe('#render', () => {
    [
      `<gux-form-heading><h1 slot="heading">Form Heading</h1></gux-form-heading>`,
      `<gux-form-heading><h2 slot="heading">Form Heading</h2></gux-form-heading>`
    ].forEach((html, index) => {
      it(`should render the gux-form-heading component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-form-heading');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
