import { checkRenders } from '@test/specTestUtils';

import { GuxFormFieldCheckboxGroupBeta } from '../gux-form-field-checkbox-group';

import { renderConfigs } from './gux-form-field-checkbox-group.common';

const components = [GuxFormFieldCheckboxGroupBeta];

describe('gux-form-field-checkbox-group-beta', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
