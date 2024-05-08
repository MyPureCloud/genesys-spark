import { newSpecPage } from '@test/specTestUtils';
import { GuxDatepicker } from '../gux-datepicker';
import { useRegionalDates } from '../../../../i18n/use-regional-dates';
// import { useRegionalDates } from 'i18n/use-regional-dates';
const languageList =    [
  'ar', 'cs', 'da', 'de', 'en', 'es-es', 'es', 'fi','fr-ca',
  'fr', 'he','it', 'ja', 'ko', 'nl', 'no', 'pl', 'pt-br',
  'pt-pt', 'ru', 'sv', 'th', 'tr', 'uk', 'zh-cn', 'zh-tw'
]
jest.mock('../../../../i18n/use-regional-dates', () => ({
  __esModule: true,
  useRegionalDates: jest.fn()
}));
const components = [GuxDatepicker];
const language = 'en';

describe('gux-datepicker', () => {
  it('should build', async () => {
    const page = await newSpecPage({
      components,
      html: `<gux-datepicker></gux-datepicker>`,
      language
    });
    expect(page.rootInstance).toBeInstanceOf(GuxDatepicker);
  });

  describe('#render', () => {
    [
      `<gux-datepicker value="1997-08-15"></gux-datepicker>`,
      `<gux-datepicker value="1997-08-15" format="mm/dd/yy"></gux-datepicker>`,
      `<gux-datepicker value="1997-08-15" format="mm.dd.yyyy"></gux-datepicker>`,
      `<gux-datepicker value="1997-08-15" disabled></gux-datepicker>`,
      `<gux-datepicker mode="range" value="2019-11-25/2019-12-02" number-of-months="2" ></gux-datepicker>`,
      `<gux-datepicker mode="range" value="2019-11-25/2019-12-02" min-date="2019-11-10" max-date="2019-12-31" number-of-months="2" ></gux-datepicker>`,
      `<gux-datepicker mode="range" value="2019-11-25/2019-12-02" min-date="2019-11-10" max-date="2019-12-31" number-of-months="2" format="mm.dd.yyyy" ></gux-datepicker>`,
      `<gux-datepicker mode="range" value="2019-11-25/2019-12-02" number-of-months="2" disabled></gux-datepicker>`,
      `<gux-datepicker value="1997-08-15" start-day-of-week="6"></gux-datepicker>`
    ].forEach((input, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        const page = await newSpecPage({
          components,
          html: input,
          language
        });
        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('#render using regional dates', () => {
    languageList.forEach((lang) => {
    [
      `<gux-datepicker value="1997-08-15"></gux-datepicker>`,
      `<gux-datepicker value="1997-08-15" format="mm/dd/yy"></gux-datepicker>`,
      `<gux-datepicker value="1997-08-15" format="mm.dd.yyyy"></gux-datepicker>`,
      `<gux-datepicker value="1997-08-15" disabled></gux-datepicker>`,
      `<gux-datepicker mode="range" value="2019-11-25/2019-12-02" number-of-months="2" ></gux-datepicker>`,
      `<gux-datepicker mode="range" value="2019-11-25/2019-12-02" min-date="2019-11-10" max-date="2019-12-31" number-of-months="2" ></gux-datepicker>`,
      `<gux-datepicker mode="range" value="2019-11-25/2019-12-02" min-date="2019-11-10" max-date="2019-12-31" number-of-months="2" format="mm.dd.yyyy" ></gux-datepicker>`,
      `<gux-datepicker mode="range" value="2019-11-25/2019-12-02" number-of-months="2" disabled></gux-datepicker>`,
      `<gux-datepicker value="1997-08-15" start-day-of-week="6"></gux-datepicker>`
    ].forEach((input, index) => {
      it(`should render component as expected (${index + 1})`, async () => {
        // not working as expected
        console.log('testing useregionaldates', useRegionalDates)
        // (useRegionalDates as jest.Mock).mockImplementation(() => true)
        const page = await newSpecPage({
          components,
          html: input,
          language:lang
        });
      
        expect(page.root).toMatchSnapshot();
      });
    });
  });
})
});
