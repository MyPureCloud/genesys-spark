import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-loading-message.common';

test.describe('gux-loading-message', () => {
  checkRenders({ renderConfigs, element: 'gux-loading-message' });
});
