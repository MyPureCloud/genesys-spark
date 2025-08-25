import { checkRenders } from '@test/specTestUtils';

import { GuxFormFieldTextarea } from '../gux-form-field-textarea';

import { renderConfigs } from './gux-form-field-textarea.common';

const components = [GuxFormFieldTextarea];

describe('gux-form-field-textarea', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
