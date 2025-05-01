jest.mock('../../../../utils/decorator/on-resize', () => ({
  __esModule: true,
  OnResize: jest.fn()
}));

import { checkRenders } from '@test/specTestUtils';
import { GuxTruncate } from '../gux-truncate';
import { renderConfigs } from './gux-truncate.common';

const components = [GuxTruncate];

describe('gux-truncate', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
