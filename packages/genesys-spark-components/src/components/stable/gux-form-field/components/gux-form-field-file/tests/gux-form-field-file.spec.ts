import { checkRenders } from '@test/specTestUtils';

import { GuxFormFieldFile } from '../gux-form-field-file';

import { renderConfigs } from './gux-form-field-file.common';

const components = [GuxFormFieldFile];

describe('gux-form-field-file', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
