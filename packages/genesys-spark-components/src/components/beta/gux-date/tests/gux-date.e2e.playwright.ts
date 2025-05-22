import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-date.common';

test.describe('gux-date', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-date-beta'
  });
});
