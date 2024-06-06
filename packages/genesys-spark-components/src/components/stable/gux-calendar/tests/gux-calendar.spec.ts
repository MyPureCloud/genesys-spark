const useRegionalDates = jest.fn().mockReturnValue(false);

jest.mock('i18n/use-regional-dates', () => ({
  __esModule: true,
  useRegionalDates
}));

import { newSpecPage } from '@test/specTestUtils';

import { GuxCalendar } from '../gux-calendar';
import { languageList } from '../../../../i18n/languageList';

const components = [GuxCalendar];
const language = 'en';
const testCases = [
  `<gux-calendar mode="single" value="1997-08-29"></gux-calendar>`,
  `<gux-calendar mode="range" number-of-months="2" value="2019-11-25/2019-12-02"></gux-calendar>`,
  `<gux-calendar mode="single" value="1997-08-29" start-day-of-week="6"></gux-calendar>`,
  `<gux-calendar mode="single" value="1997-08-29" lang="ar"></gux-calendar>`
];
describe('gux-datepicker', () => {
  it('should build', async () => {
    const page = await newSpecPage({
      components,
      html: `<gux-calendar></gux-calendar>`,
      language
    });
    expect(page.rootInstance).toBeInstanceOf(GuxCalendar);
  });

  describe('#render', () => {
    describe('#render using non regional dates', () => {
      beforeAll(() => {
        useRegionalDates.mockReturnValue(false);
      });
      languageList.forEach(language => {
        testCases.forEach((input, index) => {
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
    });
    describe('#render using regional dates', () => {
      beforeAll(() => {
        useRegionalDates.mockReturnValue(true);
      });
      languageList.forEach(language => {
        testCases.forEach((input, index) => {
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
    });
  });
});
