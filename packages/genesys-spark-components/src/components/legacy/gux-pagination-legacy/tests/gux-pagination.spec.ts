import { checkRenders } from '@test/specTestUtils';

import { GuxPaginationLegacy } from '../gux-pagination';
import { GuxButton } from '../../../stable/gux-button/gux-button';
import { GuxDropdown } from '../../../stable/gux-dropdown/gux-dropdown';
import { GuxListbox } from '../../../stable/gux-listbox/gux-listbox';
import { GuxOption } from '../../../stable/gux-listbox/options/gux-option/gux-option';
import { GuxPaginationButtonsLegacy } from '../gux-pagination-buttons-legacy/gux-pagination-buttons';
import { GuxPaginationItemCountsLegacy } from '../gux-pagination-item-counts-legacy/gux-pagination-item-counts';
import { GuxPaginationItemsPerPageLegacy } from '../gux-pagination-items-per-page-legacy/gux-pagination-items-per-page';

import { renderConfigs } from './gux-pagination.common';

const components = [
  GuxButton,
  GuxDropdown,
  GuxListbox,
  GuxOption,
  GuxPaginationLegacy,
  GuxPaginationButtonsLegacy,
  GuxPaginationItemCountsLegacy,
  GuxPaginationItemsPerPageLegacy
];

describe('gux-pagination-legacy', () => {
  describe('#render', () => {
    checkRenders(renderConfigs, components);
  });
});
