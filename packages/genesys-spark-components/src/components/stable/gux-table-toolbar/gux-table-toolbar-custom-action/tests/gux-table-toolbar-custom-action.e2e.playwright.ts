import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-table-toolbar-custom-action.common';

test.describe('gux-table-toolbar-custom-action', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-button-slot'
  });
});
