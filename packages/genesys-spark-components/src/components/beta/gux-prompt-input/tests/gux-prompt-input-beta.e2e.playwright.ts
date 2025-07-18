import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-prompt-input-beta.e2e.common';

test.describe('gux-prompt-input-beta', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-prompt-input-beta'
  });
});
