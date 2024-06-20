import { a11yCheck, newSparkE2EPage } from '../../../../../test/e2eTestUtils';

describe('gux-form-fieldset-heading', () => {
  describe('#render', () => {
    [
      `<gux-form-fieldset-heading><h2 slot="heading">Form Fieldset Header</h2></gux-form-fieldset-heading>`,
      `<gux-form-fieldset-heading><h3 slot="heading">Form Fieldset Header</h3></gux-form-fieldset-heading>`
    ].forEach((html, index) => {
      it(`should render the gux-form-fieldset component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-form-fieldset-heading');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
