import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-button-slot.common';

test.describe('gux-button-slot', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-button-slot'
  });
});
