import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-month-picker.common';

test.describe('gux-month-picker-beta', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-month-picker-beta'
  });
});
