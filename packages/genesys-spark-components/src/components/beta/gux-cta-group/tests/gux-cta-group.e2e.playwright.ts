import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-cta-group.common';

test.describe('gux-cta-group', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-cta-group'
  });
});
