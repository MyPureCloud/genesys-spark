import { checkRenders } from '@test/specTestUtils';

import { GuxFormFieldColor } from '../gux-form-field-color';

import { renderConfigs } from './gux-form-field-color.common';

const components = [GuxFormFieldColor];

describe('gux-form-field-color', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
