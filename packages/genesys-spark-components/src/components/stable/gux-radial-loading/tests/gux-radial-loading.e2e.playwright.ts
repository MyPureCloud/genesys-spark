import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-radial-loading.common';

test.describe('gux-radial-loading', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-radial-loading'
  });
});
