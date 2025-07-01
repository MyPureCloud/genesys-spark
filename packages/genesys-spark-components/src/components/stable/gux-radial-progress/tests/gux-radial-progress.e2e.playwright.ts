import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-radial-progress.common';

test.describe('gux-radial-progress', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-radial-progress',
    disableAnimations: true
  });
});
