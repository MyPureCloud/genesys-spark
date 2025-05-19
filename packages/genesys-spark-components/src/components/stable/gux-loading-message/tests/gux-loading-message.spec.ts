import { checkRenders } from '@test/specTestUtils';
import { GuxLoadingMessage } from '../gux-loading-message';
import { renderConfigs } from './gux-loading-message.common';

const components = [GuxLoadingMessage];

describe('gux-loading-message', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
