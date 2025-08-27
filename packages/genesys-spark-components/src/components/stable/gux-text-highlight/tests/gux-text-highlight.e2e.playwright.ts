import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-text-highlight.common';

test.describe('gux-text-highlight', () => {
  checkRenders({ renderConfigs, element: 'gux-text-highlight' });
});
