import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-avatar.common';

test.describe('gux-avatar-beta', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-avatar-beta'
  });
});
