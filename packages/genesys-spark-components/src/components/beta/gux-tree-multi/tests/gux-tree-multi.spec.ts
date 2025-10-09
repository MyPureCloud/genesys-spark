import { checkRenders } from '@test/specTestUtils';

import { GuxTreeMulti } from '../gux-tree-multi';
import { GuxBranchMulti } from '../gux-branch-multi/gux-branch-multi';
import { GuxLeafMulti } from '../gux-leaf-multi/gux-leaf-multi';

import { renderConfigs } from './gux-tree-multi.common';

const components = [GuxTreeMulti, GuxBranchMulti, GuxLeafMulti];

describe('gux-tree-multi', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
