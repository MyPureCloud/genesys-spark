import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-table-toolbar.common';

test.describe('gux-table-toolbar', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-table-toolbar'
  });
});
