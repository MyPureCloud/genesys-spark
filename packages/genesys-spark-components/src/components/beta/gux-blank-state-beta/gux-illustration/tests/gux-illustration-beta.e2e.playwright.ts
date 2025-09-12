import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-illustration-beta.common';

test.describe('gux-illustration-beta', () => {
  checkRenders({
    renderConfigs,
    element: 'gux-illustration-beta'
  });
});
