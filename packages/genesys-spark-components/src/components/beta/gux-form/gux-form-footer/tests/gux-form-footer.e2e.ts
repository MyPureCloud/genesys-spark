import { a11yCheck, newSparkE2EPage } from '../../../../../test/e2eTestUtils';

describe('gux-form-footer', () => {
  describe('#render', () => {
    [
      `<gux-form-footer placement="page-desktop">
      <footer>
        <gux-button accent="primary">Primary</gux-button>
        <gux-button accent="secondary">Secondary</gux-button>
      </footer>
        </gux-form-footer>`,
      `<gux-form-footer placement="page-desktop">
      <footer>
        <gux-button accent="primary">Primary</gux-button>
      </footer>
    </gux-form-footer>`
    ].forEach((html, index) => {
      it(`should render the gux-form-footer component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-form-footer');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
