import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-label-info.common';

test.describe('gux-label-info-beta', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-label-info-beta'
  });
});
