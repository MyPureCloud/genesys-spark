const useRegionalDates = jest.fn().mockReturnValue(false);

jest.mock('i18n/use-regional-dates', () => ({
  __esModule: true,
  useRegionalDates
}));

import { newSpecPage } from '@test/specTestUtils';
import { GuxTimePicker } from '../gux-time-picker';
import { languageList } from '../../../../i18n/languageList';

const components = [GuxTimePicker];
const html = `<gux-time-picker value="09:00"></gux-time-picker>`;
describe('gux-time-picker', () => {
  describe('#render using non regional dates', () => {
    beforeAll(() => {
      useRegionalDates.mockReturnValue(false);
    });

    languageList.forEach(language => {
      it(`should render as expected`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxTimePicker);
        expect(page.root).toMatchSnapshot();
      });
    });
  });

  describe('#render using regional dates', () => {
    beforeAll(() => {
      useRegionalDates.mockReturnValue(true);
    });
    languageList.forEach(language => {
      it(`should render as expected`, async () => {
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxTimePicker);
        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
