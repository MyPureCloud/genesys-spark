import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

const date = '2022-07-07T13:35:30.100Z';

describe('gux-date-time-beta', () => {
  describe('#render', () => {
    [
      `<gux-date-time-beta datetime=${date} format="short"></gux-date-time-beta>`,
      `<gux-date-time-beta datetime=${date} format="medium"></gux-date-time-beta>`,
      `<gux-date-time-beta datetime=${date} format="long"></gux-date-time-beta>`,
      `<gux-date-time-beta datetime=${date} format="full"></gux-date-time-beta>`
    ].forEach((html, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });
        await a11yCheck(page);

        const element = await page.find('gux-date-time-beta');
        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
