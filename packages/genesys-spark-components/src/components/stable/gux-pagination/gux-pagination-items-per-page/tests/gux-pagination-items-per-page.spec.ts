import { newSpecPage } from '@test/specTestUtils';

import { GuxPaginationItemsPerPage } from '../gux-pagination-items-per-page';
import { GuxDropdown } from '../../../gux-dropdown/gux-dropdown';
import { GuxListbox } from '../../../gux-listbox/gux-listbox';
import { GuxOption } from '../../../gux-listbox/options/gux-option/gux-option';

const components = [
  GuxPaginationItemsPerPage,
  GuxDropdown,
  GuxListbox,
  GuxOption
];
const language = 'en';

describe('gux-pagination-items-per-page', () => {
  describe('#render', () => {
    [
      { itemsPerPage: 25, disabled: false },
      { itemsPerPage: 50, disabled: false },
      { itemsPerPage: 75, disabled: false },
      { itemsPerPage: 100, disabled: false },
      { itemsPerPage: 25, disabled: true },
      { itemsPerPage: 50, disabled: true },
      { itemsPerPage: 75, disabled: true },
      { itemsPerPage: 100, disabled: true }
    ].forEach(({ itemsPerPage, disabled }, index) => {
      it(`should render as expected (${index + 1})`, async () => {
        const html = `
          <gux-pagination-items-per-page
            items-per-page="${itemsPerPage}" disabled="${disabled}">
          </gux-pagination-items-per-page>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxPaginationItemsPerPage);

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
