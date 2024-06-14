import { a11yCheck, newSparkE2EPage } from '../../../../../test/e2eTestUtils';

describe('gux-form-description', () => {
  describe('#render', () => {
    [
      `<gux-form-description><p slot="description">This is a simple paragraph to accompany the form header.</p></gux-form-description>`,
      `<gux-form-description><span slot="description">This is a simple paragraph to accompany the form header.</span></gux-form-description>`
    ].forEach((html, index) => {
      it(`should render the gux-form-description component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-form-description');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
