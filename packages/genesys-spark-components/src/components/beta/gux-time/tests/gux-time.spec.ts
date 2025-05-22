const useRegionalDates = jest.fn().mockReturnValue(false);

jest.mock('i18n/use-regional-dates', () => ({
  __esModule: true,
  useRegionalDates
}));

import { checkRenders } from '@test/specTestUtils';
import { GuxTime } from '../gux-time';
import { languageList } from '../../../../i18n/languageList';
import { renderConfigs, timezoneRenderConfigs } from './gux-time.common';

const components = [GuxTime];

describe('gux-time', () => {
  describe('#render regional dates', () => {
    beforeAll(() => {
      useRegionalDates.mockReturnValue(true);
    });

    describe('#render', () => {
      checkRenders(renderConfigs, components);
    });

    describe('#render different time zones', () => {
      checkRenders(timezoneRenderConfigs, components);
    });

    describe('#render different languages', () => {
      languageList.forEach(language => {
        describe(`#${language}`, () => {
          checkRenders(renderConfigs, components, language);
        });
      });
    });
  });

  describe('#render using non regional dates', () => {
    beforeAll(() => {
      useRegionalDates.mockReturnValue(true);
    });

    describe('#render', () => {
      checkRenders(renderConfigs, components);
    });

    describe('#render different time zones', () => {
      checkRenders(timezoneRenderConfigs, components);
    });

    describe('#render different languages', () => {
      languageList.forEach(language => {
        describe(`#${language}`, () => {
          checkRenders(renderConfigs, components, language);
        });
      });
    });
  });
});
