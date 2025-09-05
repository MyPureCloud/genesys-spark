import { checkRenders } from '@test/specTestUtils';

import { GuxLogo } from '../gux-logo';

import { renderConfigs } from './gux-logo.common';

const components = [GuxLogo];

describe('gux-logo-beta', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
