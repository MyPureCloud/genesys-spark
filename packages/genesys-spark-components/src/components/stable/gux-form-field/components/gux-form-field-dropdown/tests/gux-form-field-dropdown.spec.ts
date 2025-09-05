import { checkRenders } from '@test/specTestUtils';

import { GuxFormFieldDropdown } from '../gux-form-field-dropdown';
import { GuxDropdown } from '../../../../gux-dropdown/gux-dropdown';
import { GuxDropdownMulti } from '../../../../gux-dropdown-multi/gux-dropdown-multi';
import { GuxListbox } from '../../../../gux-listbox/gux-listbox';
import { GuxListboxMulti } from '../../../../gux-listbox-multi/gux-listbox-multi';
import { GuxOption } from '../../../../gux-listbox/options/gux-option/gux-option';
import { GuxOptionMulti } from '../../../../gux-listbox-multi/gux-option-multi/gux-option-multi';
import { renderConfigs } from './gux-form-field-dropdown.common';

const components = [
  GuxFormFieldDropdown,
  GuxDropdown,
  GuxDropdownMulti,
  GuxListbox,
  GuxListboxMulti,
  GuxOption,
  GuxOptionMulti
];

describe('gux-form-field-dropdown', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
