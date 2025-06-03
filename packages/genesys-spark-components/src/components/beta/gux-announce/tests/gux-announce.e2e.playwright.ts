import { checkRenders, test } from '@test/playwrightTestUtils';
import { renderConfigs } from './gux-announce.common';

test.describe('gux-announce', () => {
  checkRenders({ renderConfigs });
});
