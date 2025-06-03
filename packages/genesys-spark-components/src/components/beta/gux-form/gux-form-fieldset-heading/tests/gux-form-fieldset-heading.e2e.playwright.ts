import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfig } from './gux-form-fieldset-heading.common';

test.describe('gux-form-fieldset-heading', () => {
  checkRenders({
    renderConfigs: [renderConfig],
    element: 'gux-form-fieldset-heading'
  });
});
