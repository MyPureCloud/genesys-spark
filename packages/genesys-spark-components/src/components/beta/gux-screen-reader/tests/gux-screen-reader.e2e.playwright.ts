import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-screen-reader.common';

test.describe('gux-screen-reader-beta', () => {
  checkRenders(renderConfigs, 'gux-screen-reader-beta');
});
