import { newSpecPage } from '@stencil/core/testing';
import { GuxPaginationItemsPerPage } from '../gux-pagination-items-per-page';
import { GuxDropdown } from '../../../gux-dropdown/gux-dropdown';
import { GuxOption } from '../../../gux-dropdown/gux-option/gux-option';

const components = [GuxPaginationItemsPerPage, GuxDropdown, GuxOption];
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
          <gux-pagination-items-per-page items-per-page="${itemsPerPage}">
            <gux-option value="25">25</gux-option>
            <gux-option value="50">50</gux-option>
            <gux-option value="75">75</gux-option>
            <gux-option value="100">100</gux-option>
          </gux-pagination-items-per-page>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxPaginationItemsPerPage);

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
