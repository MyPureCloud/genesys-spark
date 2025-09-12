import { GuxBlankStateBeta } from '../gux-blank-state';
import { checkRenders } from '@test/specTestUtils';
import { renderConfigs } from './gux-blank-state.common';

const components = [GuxBlankStateBeta];

describe('#render', () => {
  checkRenders(renderConfigs, components);
});
