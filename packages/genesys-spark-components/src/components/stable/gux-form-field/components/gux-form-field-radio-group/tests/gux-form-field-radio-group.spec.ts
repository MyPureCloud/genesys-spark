import { checkRenders } from '@test/specTestUtils';

import { GuxFormFieldRadioGroupBeta } from '../gux-form-field-radio-group';

import { renderConfigs } from './gux-form-field-radio-group.common';

const components = [GuxFormFieldRadioGroupBeta];

describe('gux-form-field-radio-group-beta', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
