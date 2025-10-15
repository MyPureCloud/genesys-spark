import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-dismiss-button.common';

test.describe('gux-dismiss-button', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-dismiss-button'
  });
});
