import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-inline-alert.common';

test.describe('gux-inline-alert', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-inline-alert'
  });
});
