import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-page-loading-spinner.common';

test.describe('gux-page-loading-spinner', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-page-loading-spinner',
    disableAnimations: true
  });
});
