import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-action-toast.common';

test.describe('gux-action-toast-legacy', () => {
  test.describe('#render', () => {
    checkRenders({ renderConfigs, element: 'gux-action-toast-legacy' });
  });
});
