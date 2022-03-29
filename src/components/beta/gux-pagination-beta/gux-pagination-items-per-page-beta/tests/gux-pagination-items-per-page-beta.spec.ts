import { newSpecPage } from '@stencil/core/testing';
import { GuxPaginationItemsPerPage } from '../gux-pagination-items-per-page-beta';
import { GuxDropdownV2Beta } from '../../../gux-dropdown-v2/gux-dropdown-v2';
import { GuxListbox } from '../../../gux-listbox/gux-listbox';
import { GuxOptionV2 } from '../../../gux-listbox/gux-option-v2/gux-option-v2';

const components = [
  GuxPaginationItemsPerPage,
  GuxDropdownV2Beta,
  GuxListbox,
  GuxOptionV2
];
const language = 'en';

describe('gux-pagination-items-per-page', () => {
  describe('#render', () => {
    [
      { itemsPerPage: 25 },
      { itemsPerPage: 50 },
      { itemsPerPage: 75 },
      { itemsPerPage: 100 }
    ].forEach(({ itemsPerPage }, index) => {
      it(`should render as expected (${index + 1})`, async () => {
        const html = `
          <gux-pagination-items-per-page-beta
            items-per-page="${itemsPerPage}">
          </gux-pagination-items-per-page-beta>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxPaginationItemsPerPage);

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
