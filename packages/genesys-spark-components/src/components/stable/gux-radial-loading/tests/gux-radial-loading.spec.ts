import { GuxRadialLoading } from '../gux-radial-loading';
import { checkRenders } from '@test/specTestUtils';
import { renderConfigs } from './gux-radial-loading.common';
const components = [GuxRadialLoading];

describe('gux-radial-loading', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
