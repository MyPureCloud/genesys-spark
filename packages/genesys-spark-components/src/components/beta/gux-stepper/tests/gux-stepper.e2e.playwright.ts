import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-stepper.common';

test.describe('gux-stepper', () => {
  checkRenders({
    renderConfigs: renderConfigs,
    element: 'gux-stepper'
  });
});
