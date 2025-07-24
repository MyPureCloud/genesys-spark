import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-pagination-cursor.common';

test.describe('gux-pagination-cursor', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-pagination-cursor'
  });
});
