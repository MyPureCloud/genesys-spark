import { checkRenders } from '@test/specTestUtils';

import { GuxFormFieldTimeZonePicker } from '../gux-form-field-time-zone-picker';

import { renderConfigs } from './gux-form-field-time-zone-picker.common';

const components = [GuxFormFieldTimeZonePicker];

describe('gux-form-field-time-picker', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
