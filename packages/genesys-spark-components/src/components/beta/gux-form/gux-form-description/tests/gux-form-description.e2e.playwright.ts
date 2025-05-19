import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfig } from './gux-form-description.common';

test.describe('gux-form-description', () => {
  checkRenders([renderConfig], 'gux-form-description');
});
