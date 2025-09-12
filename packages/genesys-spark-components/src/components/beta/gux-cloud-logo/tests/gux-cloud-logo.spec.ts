import { checkRenders } from '@test/specTestUtils';

import { GuxCloudLogo } from '../gux-cloud-logo';

import { renderConfigs } from './gux-cloud-logo.common';

const components = [GuxCloudLogo];

describe('gux-cloud-logo-beta', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
