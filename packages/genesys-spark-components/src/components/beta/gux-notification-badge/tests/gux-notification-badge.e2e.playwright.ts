import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-notification-badge.common';

test.describe('gux-notification-badge', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-notification-badge'
  });
});
