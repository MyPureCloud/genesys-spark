import { checkRenders } from '@test/specTestUtils';

import { GuxFormFieldTimePicker } from '../gux-form-field-time-picker';

import { renderConfigs } from './gux-form-field-time-picker.common';

const components = [GuxFormFieldTimePicker];

describe('gux-form-field-time-picker', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
