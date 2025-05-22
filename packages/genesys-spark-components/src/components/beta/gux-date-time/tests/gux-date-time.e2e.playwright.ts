import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-date-time.common';

test.describe('gux-date-time', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-date-time-beta'
  });
});
