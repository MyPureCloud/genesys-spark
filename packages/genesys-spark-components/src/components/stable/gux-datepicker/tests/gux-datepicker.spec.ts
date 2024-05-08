const useRegionalDates = jest.fn().mockReturnValue(false);

jest.mock('i18n/use-regional-dates', () => ({
  __esModule: true,
  useRegionalDates
}));

import { newSpecPage } from '@test/specTestUtils';
import { GuxDatepicker } from '../gux-datepicker';

const languageList = [
  'ar',
  'cs',
  'da',
  'de',
  'en',
  'es-es',
  'es',
  'fi',
  'fr-ca',
  'fr',
  'he',
  'it',
  'ja',
  'ko',
  'nl',
  'no',
  'pl',
  'pt-br',
  'pt-pt',
  'ru',
  'sv',
  'th',
  'tr',
  'uk',
  'zh-cn',
  'zh-tw'
];

const testCases = [
  `<gux-datepicker></gux-datepicker>`,
  `<gux-datepicker value="1997-08-15"></gux-datepicker>`,
  `<gux-datepicker value="1997-08-15" format="mm/dd/yy"></gux-datepicker>`,
  `<gux-datepicker value="1997-08-15" format="mm.dd.yyyy"></gux-datepicker>`,
  `<gux-datepicker value="1997-08-15" disabled></gux-datepicker>`,
  `<gux-datepicker mode="range" value="2019-11-25/2019-12-02" number-of-months="2" ></gux-datepicker>`,
  `<gux-datepicker mode="range" value="2019-11-25/2019-12-02" min-date="2019-11-10" max-date="2019-12-31" number-of-months="2" ></gux-datepicker>`,
  `<gux-datepicker mode="range" value="2019-11-25/2019-12-02" min-date="2019-11-10" max-date="2019-12-31" number-of-months="2" format="mm.dd.yyyy" ></gux-datepicker>`,
  `<gux-datepicker mode="range" value="2019-11-25/2019-12-02" number-of-months="2" disabled></gux-datepicker>`,
  `<gux-datepicker value="1997-08-15" start-day-of-week="6"></gux-datepicker>`
];

const components = [GuxDatepicker];

describe('gux-datepicker', () => {
  describe('#render using non regional dates', () => {
    beforeAll(() => {
      useRegionalDates.mockReturnValue(false);
    });

    languageList.forEach(language => {
      testCases.forEach((html, index) => {
        it(`should render component as expected (${index + 1})`, async () => {
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      });
    });
  });

  describe('#render using regional dates', () => {
    beforeAll(() => {
      useRegionalDates.mockReturnValue(true);
    });

    languageList.forEach(language => {
      testCases.forEach((html, index) => {
        it(`should render component as expected (${index + 1})`, async () => {
          const page = await newSpecPage({ components, html, language });

          expect(page.root).toMatchSnapshot();
        });
      });
    });
  });
});
