import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-form-footer.common';

test.describe('gux-form-footer', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-form-footer'
  });
});
