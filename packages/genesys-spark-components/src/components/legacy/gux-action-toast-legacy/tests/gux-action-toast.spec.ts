import { checkRenders } from '@test/specTestUtils';

import { GuxActionToast } from '../gux-action-toast';
import { GuxButton } from '../../../stable/gux-button/gux-button';

import { renderConfigs } from './gux-action-toast.common';

const components = [GuxActionToast, GuxButton];

describe('gux-action-toast', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
