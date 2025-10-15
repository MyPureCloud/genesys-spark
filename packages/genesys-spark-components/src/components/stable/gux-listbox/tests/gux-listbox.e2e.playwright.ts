import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-listbox.common';

test.describe('gux-listbox', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-listbox',
    disableAnimations: true
  });
});
