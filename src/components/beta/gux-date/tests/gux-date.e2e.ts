import { newSparkE2EPage, a11yCheck } from '../../../../../tests/e2eTestUtils';

const date = new Date(2022, 6, 7).valueOf();

describe('gux-date-beta', () => {
  describe('#render', () => {
    [
        `<gux-date-beta locale="en" date=${date} format="short"></gux-date-beta>`,
        `<gux-date-beta locale="en" date=${date} format="medium"></gux-date-beta>`,
        `<gux-date-beta locale="en" date=${date} format="long"></gux-date-beta>`,
        `<gux-date-beta locale="en" date=${date} format="full"></gux-date-beta>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        const element = await page.find('gux-date-beta');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
