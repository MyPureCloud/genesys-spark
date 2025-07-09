import { checkRenders } from '@test/specTestUtils';
import { GuxSkipNavigationList } from '../gux-skip-navigation-list';
import { GuxSkipNavigationItem } from '../gux-skip-navigation-item/gux-skip-navigation-item';
import { renderConfig } from './gux-skip-navigation-list.common';

const components = [GuxSkipNavigationList, GuxSkipNavigationItem];

describe('gux-skip-navigation-list', () => {
  describe('#render', () => {
    checkRenders([renderConfig], components);
  });
});
