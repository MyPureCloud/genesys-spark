import { checkRenders } from '@test/specTestUtils';

import { GuxAdvancedDropdownLegacy } from '../gux-advanced-dropdown';

import { renderConfig } from './gux-advanced-dropdown.common';

const components = [GuxAdvancedDropdownLegacy];

describe('gux-advanced-dropdown-legacy', () => {
  describe('#render', () => {
    checkRenders([renderConfig], components);
  });
});
