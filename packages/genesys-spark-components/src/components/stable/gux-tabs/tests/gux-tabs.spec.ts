import { checkRenders } from '@test/specTestUtils';

import { GuxTabs } from '../gux-tabs';
import { GuxTab } from '../gux-tab/gux-tab';
import { GuxTabList } from '../gux-tab-list/gux-tab-list';
import { GuxTabPanel } from '../gux-tab-panel/gux-tab-panel';

import { renderConfigs } from './gux-tabs.common';

const components = [GuxTabs, GuxTab, GuxTabList, GuxTabPanel];

describe('gux-tabs', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
