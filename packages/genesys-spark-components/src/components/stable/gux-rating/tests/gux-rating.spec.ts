import { checkRenders } from '@test/specTestUtils';

import { GuxRating } from '../gux-rating';
import { renderConfigs } from './gux-rating.common';

const components = [GuxRating];

describe('gux-rating', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
