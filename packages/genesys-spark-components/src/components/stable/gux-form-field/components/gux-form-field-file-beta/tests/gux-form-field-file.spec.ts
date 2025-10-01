import { checkRenders } from '@test/specTestUtils';

import { GuxFormFieldFileBeta } from '../gux-form-field-file';
import { renderConfigs } from './gux-form-field-file.common';

const components = [GuxFormFieldFileBeta];

describe('gux-form-field-file-beta', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
