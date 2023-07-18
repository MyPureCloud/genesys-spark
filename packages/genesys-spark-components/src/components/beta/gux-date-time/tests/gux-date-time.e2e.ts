import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';
import { timeZoneIdentifiers } from '../../../../i18n/time-zone/identifiers';

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

  describe('#render different time zones', () => {
    timeZoneIdentifiers.forEach((timeZone: string) => {
      it(`should work as expected for "${timeZone}"`, async () => {
        const html = `<gux-date-time-beta time-zone=${timeZone} datetime="2022-07-07T12:00:00.000Z" format="full"></gux-date-time-beta>`;
        const page = await newSparkE2EPage({ html });

        const element = await page.find('gux-date-time-beta');
        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
