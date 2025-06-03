import { checkRenders } from '@test/specTestUtils';
import { GuxAnnounce } from '../gux-announce';
import { renderConfigs } from './gux-announce.common';

const components = [GuxAnnounce];

describe('gux-announce', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
