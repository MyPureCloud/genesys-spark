import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfig } from './gux-form-description.common';

test.describe('gux-form-description', () => {
  checkRenders({
    renderConfigs: [renderConfig],
    element: 'gux-form-description'
  });
});
