import { checkRenders } from '@test/specTestUtils';

import { GuxFormFieldRadio } from '../gux-form-field-radio';

import { renderConfigs } from './gux-form-field-radio.common';

const components = [GuxFormFieldRadio];

describe('gux-form-field-radio', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
