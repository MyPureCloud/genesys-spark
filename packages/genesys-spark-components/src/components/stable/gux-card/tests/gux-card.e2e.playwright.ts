import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-card.common';

test.describe('gux-card', () => {
  checkRenders(renderConfigs, 'gux-card');
});
