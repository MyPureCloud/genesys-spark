import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-time.common';

test.describe('gux-time', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-time-beta'
  });
});
