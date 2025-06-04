import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfig } from './gux-popover-list.common';

test.describe('gux-popover-list', () => {
  checkRenders([renderConfig], 'gux-popover-list');
});
