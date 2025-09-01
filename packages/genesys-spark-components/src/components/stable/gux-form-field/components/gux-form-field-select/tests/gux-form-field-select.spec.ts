import { checkRenders } from '@test/specTestUtils';

import { GuxFormFieldSelect } from '../gux-form-field-select';

import { renderConfigs } from './gux-form-field-select.common';

const components = [GuxFormFieldSelect];

describe('gux-form-field-select', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
