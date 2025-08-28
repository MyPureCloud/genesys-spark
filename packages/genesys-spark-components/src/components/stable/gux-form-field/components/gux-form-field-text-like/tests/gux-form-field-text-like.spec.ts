import { checkRenders } from '@test/specTestUtils';

import { GuxFormFieldTextLike } from '../gux-form-field-text-like';

import { renderConfigs } from './gux-form-field-text-like.common';

const components = [GuxFormFieldTextLike];

describe('gux-form-field-text-like', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
