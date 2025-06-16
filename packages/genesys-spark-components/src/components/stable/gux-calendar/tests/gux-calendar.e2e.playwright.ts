import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-calendar.common';

test.describe('gux-calendar', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-calendar'
  });
});
