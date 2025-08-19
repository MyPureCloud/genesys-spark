import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-popup.common';

test.describe('gux-popup', () => {
  test.describe('#render', () => {
    checkRenders({
      renderConfigs
    });
  });
});
