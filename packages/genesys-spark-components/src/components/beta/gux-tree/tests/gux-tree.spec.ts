import { checkRenders } from '@test/specTestUtils';

import { GuxTreeBeta } from '../gux-tree';
import { GuxBranch } from '../gux-branch/gux-branch';
import { GuxLeaf } from '../gux-leaf/gux-leaf';

import { renderConfigs } from './gux-tree.common';

const components = [GuxTreeBeta, GuxBranch, GuxLeaf];

describe('gux-time', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
