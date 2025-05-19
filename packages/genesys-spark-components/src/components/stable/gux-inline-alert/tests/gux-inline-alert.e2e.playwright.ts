import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-inline-alert.common';

test.describe('gux-inline-alert', () => {
  checkRenders(renderConfigs, 'gux-inline-alert');
});
