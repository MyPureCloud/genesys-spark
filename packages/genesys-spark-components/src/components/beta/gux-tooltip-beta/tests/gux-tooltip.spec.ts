import { checkRenders } from '@test/specTestUtils';

import { GuxTooltip } from '../gux-tooltip';

import { renderConfigs } from './gux-tooltip.common';

const components = [GuxTooltip];

describe('gux-tooltip-beta', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
