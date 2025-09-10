import { checkRenders } from '@test/specTestUtils';
import { GuxPromptInputBeta } from '../gux-prompt-input-beta';
import { renderConfigs } from './gux-prompt-input-beta.e2e.common';

const components = [GuxPromptInputBeta];

describe('gux-prompt-input-beta', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
