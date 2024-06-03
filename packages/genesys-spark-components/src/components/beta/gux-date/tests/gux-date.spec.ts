const useRegionalDates = jest.fn().mockReturnValue(false);

jest.mock('i18n/use-regional-dates', () => ({
  __esModule: true,
  useRegionalDates
}));

import { newSpecPage } from '@test/specTestUtils';
import { GuxDate } from '../gux-date';
import { timeZoneIdentifiers } from '../../../../i18n/time-zone/identifiers';
import { languageList } from '../../../../i18n/languageList';

const components = [GuxDate];
const language = 'en';
const date = '2022-07-07T13:35:30.100Z';

const testCases = [
  `<gux-date-beta datetime=${date} format="short"></gux-date-beta>`,
  `<gux-date-beta datetime=${date} format="medium"></gux-date-beta>`,
  `<gux-date-beta datetime=${date} format="full"></gux-date-beta>`,
  `<gux-date-beta datetime=${date} format="long"></gux-date-beta>`
];

describe('gux-date', () => {
  describe('#render regional dates', () => {
    describe('#render different datetime formats eg(short,medium,full,long)', () => {
      beforeAll(() => {
        useRegionalDates.mockReturnValue(false);
      });

      testCases.forEach((html, index) => {
        it(`should render component as expected (${index + 1})`, async () => {
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      });
    });

    describe('#render different time zones', () => {
      timeZoneIdentifiers.forEach((timeZone: string) => {
        it(`should work as expected for "${timeZone}"`, async () => {
          const html = `<gux-date-beta time-zone=${timeZone} datetime="2022-07-07T12:00:00.000Z" format="full"></gux-date-beta>`;
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      });
    });

    describe('#render different languages', () => {
      languageList.forEach(lang => {
        it(`should work as expected for ${lang}`, async () => {
          const html = `<gux-date-beta datetime="2022-07-07T12:00:00.000Z" format="full"></gux-date-beta>`;
          const page = await newSpecPage({ components, html, language: lang });

          expect(page.root).toMatchSnapshot();
        });
      });
    });
  });
  describe('#render using non regional dates', () => {
    beforeAll(() => {
      useRegionalDates.mockReturnValue(true);
    });
    describe('#render different datetime formats eg(short,medium,full,long)', () => {
      testCases.forEach((html, index) => {
        it(`should render component as expected (${index + 1})`, async () => {
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      });
    });

    describe('#render different time zones', () => {
      timeZoneIdentifiers.forEach((timeZone: string) => {
        it(`should work as expected for "${timeZone}"`, async () => {
          const html = `<gux-date-beta time-zone=${timeZone} datetime="2022-07-07T12:00:00.000Z" format="full"></gux-date-beta>`;
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      });
    });

    describe('#render different languages', () => {
      languageList.forEach(lang => {
        it(`should work as expected for ${lang}`, async () => {
          const html = `<gux-date-beta datetime="2022-07-07T12:00:00.000Z" format="full"></gux-date-beta>`;
          const page = await newSpecPage({ components, html, language: lang });

          expect(page.root).toMatchSnapshot();
        });
      });
    });
  });
});
