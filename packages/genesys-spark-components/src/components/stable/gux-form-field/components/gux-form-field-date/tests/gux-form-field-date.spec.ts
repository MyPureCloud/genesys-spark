import { checkRenders } from '@test/specTestUtils';

import { GuxFormFieldDate } from '../gux-form-field-date';

import { renderConfigs } from './gux-form-field-date.common';

const components = [GuxFormFieldDate];

describe('gux-form-field-date', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
