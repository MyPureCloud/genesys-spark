import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfig } from './gux-form-heading.common';

test.describe('gux-form-heading', () => {
  checkRenders({ renderConfigs: [renderConfig], element: 'gux-form-heading' });
});
