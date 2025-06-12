import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-time-picker.common';

test.describe('gux-time-picker', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-popup'
  });
});
