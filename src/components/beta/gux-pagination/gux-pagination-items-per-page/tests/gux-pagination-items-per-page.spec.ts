import { newSpecPage } from './node_modules/@stencil/core/testing';
import { GuxPaginationItemsPerPageBeta } from '../gux-pagination-items-per-page';
import { GuxDropdownV2Beta } from '../../../gux-dropdown-v2/gux-dropdown-v2';
import { GuxListbox } from '../../../gux-listbox/gux-listbox';
import { GuxOptionV2 } from '../../../gux-listbox/gux-option-v2/gux-option-v2';

const components = [
  GuxPaginationItemsPerPageBeta,
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

        expect(page.rootInstance).toBeInstanceOf(GuxPaginationItemsPerPageBeta);

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
