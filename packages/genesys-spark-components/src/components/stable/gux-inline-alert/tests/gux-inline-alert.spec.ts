import { checkRenders } from '@test/specTestUtils';
import { GuxAlert } from '../gux-inline-alert';
import { renderConfigs } from './gux-inline-alert.common';

const components = [GuxAlert];

describe('gux-inline-alert', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
