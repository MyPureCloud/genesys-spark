import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfig } from './gux-dismiss-button.common';

test.describe('gux-dismiss-button', () => {
  checkRenders([renderConfig], 'gux-dismiss-button');
});
