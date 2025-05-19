import { checkRenders } from '@test/specTestUtils';
import { GuxDismissButton } from '../gux-dismiss-button';
import { renderConfig } from './gux-dismiss-button.common';

const components = [GuxDismissButton];

describe('gux-dismiss-button', () => {
  describe('#render', () => {
    checkRenders([renderConfig], components);
  });
});
