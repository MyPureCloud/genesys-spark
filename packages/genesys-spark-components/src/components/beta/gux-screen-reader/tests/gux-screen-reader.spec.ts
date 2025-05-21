import { checkRenders } from '@test/specTestUtils';
import { GuxScreenReader } from '../gux-screen-reader';
import { renderConfigs } from './gux-screen-reader.common';

const components = [GuxScreenReader];

describe('gux-screen-reader-beta', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
