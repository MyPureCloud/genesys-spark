import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-link.common';

test.describe('gux-link-beta', () => {
  checkRenders({ renderConfigs, element: 'gux-link-beta' });
});
