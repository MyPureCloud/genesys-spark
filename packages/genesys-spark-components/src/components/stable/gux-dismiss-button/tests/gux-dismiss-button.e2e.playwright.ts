import { checkRenders } from '@test/specTestUtils';
import { GuxDismissButton } from '../gux-dismiss-button';
import { renderConfigs } from './gux-dismiss-button.common';

const components = [GuxDismissButton];

describe('gux-dismiss-button', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
