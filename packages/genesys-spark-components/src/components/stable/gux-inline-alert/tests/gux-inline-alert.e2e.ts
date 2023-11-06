import { a11yCheck, newSparkE2EPage } from '../../../../test/e2eTestUtils';

describe('gux-inline-alert', () => {
  describe('#render', () => {
    [
      `<gux-inline-alert accent="info">Note: This is an information alert.</gux-inline-alert>`,
      `<gux-inline-alert accent="success">Note: This is a success alert.</gux-inline-alert>`,
      `<gux-inline-alert accent="warning">Note: This is a warning alert.</gux-inline-alert>`,
      `<gux-inline-alert accent="error">Note: This is a warning alert.</gux-inline-alert>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-inline-alert');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
