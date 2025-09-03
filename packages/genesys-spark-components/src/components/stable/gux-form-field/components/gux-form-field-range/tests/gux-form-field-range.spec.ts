import { checkRenders } from '@test/specTestUtils';

import { GuxFormFieldRange } from '../gux-form-field-range';

import { renderConfigs } from './gux-form-field-range.common';

const components = [GuxFormFieldRange];

describe('gux-form-field-range', () => {
  beforeAll(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
  });

  describe('#render', () => {
    checkRenders(renderConfigs, components, 'en', () => {
      jest.advanceTimersByTime(100);

      return Promise.resolve();
    });
  });
});
