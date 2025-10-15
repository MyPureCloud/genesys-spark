import { checkRenders } from '@test/specTestUtils';

import { GuxListbox } from '../gux-listbox';
import { GuxOption } from '../options/gux-option/gux-option';
import { GuxOptionIcon } from '../options/gux-option-icon/gux-option-icon';
import { GuxOptionGroup } from '../option-group/gux-option-group';

import { renderConfigs } from './gux-listbox.common';

const components = [GuxListbox, GuxOption, GuxOptionIcon, GuxOptionGroup];

describe('gux-listbox', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
