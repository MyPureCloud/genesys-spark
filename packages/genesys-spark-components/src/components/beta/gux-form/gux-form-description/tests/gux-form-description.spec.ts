import { checkRenders } from '@test/specTestUtils';

import { GuxFormDescription } from '../gux-form-description';
import { renderConfig } from './gux-form-description.common';

const components = [GuxFormDescription];

describe('gux-form-description', () => {
  checkRenders([renderConfig], components);
});
