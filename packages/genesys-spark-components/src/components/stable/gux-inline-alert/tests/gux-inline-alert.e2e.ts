import { a11yCheck, newSparkE2EPage } from '../../../../test/e2eTestUtils';

describe('gux-inline-alert', () => {
  describe('#render', () => {
    [
      `<gux-inline-alert accent="info"><div slot="message">Note: This is an information alert.</div></gux-inline-alert>`,
      `<gux-inline-alert accent="success"><div slot="message">Note: This is a success alert.</div></gux-inline-alert>`,
      `<gux-inline-alert accent="warning"><div slot="message">Note: This is a warning alert.</div></gux-inline-alert>`,
      `<gux-inline-alert accent="error"><div slot="message">Note: This is a warning alert.</div></gux-inline-alert>`
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
