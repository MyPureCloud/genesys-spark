import { checkRenders } from '@test/specTestUtils';
import { GuxTableToolbarCustomAction } from '../gux-table-toolbar-custom-action';
import { renderConfigs } from './gux-table-toolbar-custom-action.common';

const components = [GuxTableToolbarCustomAction];

describe('gux-table-toolbar-custom-action', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
