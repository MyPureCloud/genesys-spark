import { checkRenders } from '@test/specTestUtils';

import { GuxLogomark } from '../gux-logomark';

import { renderConfigs } from './gux-logomark.common';

const components = [GuxLogomark];

describe('gux-logomark-beta', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
