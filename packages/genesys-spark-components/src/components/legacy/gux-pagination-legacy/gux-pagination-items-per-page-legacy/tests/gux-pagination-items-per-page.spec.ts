import { newSpecPage } from '@test/specTestUtils';

import { GuxPaginationItemsPerPageLegacy } from '../gux-pagination-items-per-page';
import { GuxDropdown } from '../../../../stable/gux-dropdown/gux-dropdown';
import { GuxListbox } from '../../../../stable/gux-listbox/gux-listbox';
import { GuxOption } from '../../../../stable/gux-listbox/options/gux-option/gux-option';

const components = [
  GuxPaginationItemsPerPageLegacy,
  GuxDropdown,
  GuxListbox,
  GuxOption
];
const language = 'en';

describe('gux-pagination-items-per-page-legacy', () => {
  describe('#render', () => {
    [
      { itemsPerPage: 25 },
      { itemsPerPage: 50 },
      { itemsPerPage: 75 },
      { itemsPerPage: 100 }
    ].forEach(({ itemsPerPage }, index) => {
      it(`should render as expected (${index + 1})`, async () => {
        const html = `
          <gux-pagination-items-per-page-legacy
            items-per-page="${itemsPerPage}">
          </gux-pagination-items-per-page-legacy>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(
          GuxPaginationItemsPerPageLegacy
        );

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
