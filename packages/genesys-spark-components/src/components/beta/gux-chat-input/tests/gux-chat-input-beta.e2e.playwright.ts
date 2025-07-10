import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-chat-input-beta.e2e.common';

test.describe('gux-chat-input-beta', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-chat-input-beta'
  });
});
