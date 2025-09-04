import { checkRenders } from '@test/specTestUtils';

import { GuxCloudLogomark } from '../gux-cloud-logomark';

import { renderConfigs } from './gux-cloud-logomark.common';

const components = [GuxCloudLogomark];

describe('gux-cloud-logomark-beta', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
