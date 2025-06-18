import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-form.common';

test.describe('gux-form', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-form-beta'
  });
});
