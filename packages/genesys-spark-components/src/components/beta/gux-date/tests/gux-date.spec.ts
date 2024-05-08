import { newSpecPage } from '@test/specTestUtils';
import { GuxDate } from '../gux-date';
import { timeZoneIdentifiers } from '../../../../i18n/time-zone/identifiers';

const components = [GuxDate];
const language = 'en';
const date = '2022-07-07T13:35:30.100Z';
const languageList =    [
  'ar', 'cs', 'da', 'de', 'en', 'es-es', 'es', 'fi','fr-ca',
  'fr', 'he','it', 'ja', 'ko', 'nl', 'no', 'pl', 'pt-br',
  'pt-pt', 'ru', 'sv', 'th', 'tr', 'uk', 'zh-cn', 'zh-tw'
]

describe('gux-date', () => {
  describe('#render different datetime formats eg(short,medium,full,long)', () => {
    [
      `<gux-date-beta datetime=${date} format="short"></gux-date-beta>`,
      `<gux-date-beta datetime=${date} format="medium"></gux-date-beta>`,
      `<gux-date-beta datetime=${date} format="full"></gux-date-beta>`,
      `<gux-date-beta datetime=${date} format="long"></gux-date-beta>`
    ].forEach((html, index) => {
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
    languageList.forEach((lang) => {
    it(`should work as expected for ${lang}`, async () => {
      const html = `<gux-date-beta datetime="2022-07-07T12:00:00.000Z" format="full"></gux-date-beta>`;
      const page = await newSpecPage({ components, html, language:lang });

      expect(page.root).toMatchSnapshot();

    })
    })
  })
});
