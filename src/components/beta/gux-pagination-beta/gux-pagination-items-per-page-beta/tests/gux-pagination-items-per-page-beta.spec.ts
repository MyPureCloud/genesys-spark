import { newSpecPage } from '@stencil/core/testing';
import { GuxPaginationItemsPerPageBeta } from '../gux-pagination-items-per-page-beta';
import { GuxDropdown } from '../../../../stable/gux-dropdown/gux-dropdown';
import { GuxListbox } from '../../../../stable/gux-listbox/gux-listbox';
import { GuxOption } from '../../../../stable/gux-listbox/gux-option/gux-option';

const components = [
  GuxPaginationItemsPerPageBeta,
  GuxDropdown,
  GuxListbox,
  GuxOption
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
