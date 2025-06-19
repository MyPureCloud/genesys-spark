import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-selector-card.common';

test.describe('gux-selector-card', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-selector-card-beta'
  });
});
