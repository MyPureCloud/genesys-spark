import { checkRenders } from '@test/specTestUtils';

import { GuxFormFieldNumber } from '../gux-form-field-number';

import { renderConfigs } from './gux-form-field-number.common';

const components = [GuxFormFieldNumber];

describe('gux-form-field-number', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
