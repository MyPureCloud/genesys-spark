import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfig } from './gux-switch.common';

test.describe('gux-switch-legacy', () => {
  test.describe('#render', () => {
    checkRenders([renderConfig], 'gux-switch-legacy');
  });
});
