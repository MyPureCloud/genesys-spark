import { checkRenders } from '@test/specTestUtils';

import { GuxFormFieldSearch } from '../gux-form-field-search';

import { renderConfigs } from './gux-form-field-search.common';

const components = [GuxFormFieldSearch];

describe('gux-form-field-search', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
