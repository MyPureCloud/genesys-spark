import { checkRenders } from '@test/specTestUtils';
import { GuxTextHighlight } from '../gux-text-highlight';
import { renderConfigs } from './gux-text-highlight.common';

const components = [GuxTextHighlight];

describe('gux-text-highlight', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
