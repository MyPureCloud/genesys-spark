import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxPaginationItemsPerPageBeta } from '../gux-pagination-items-per-page-beta';
import { GuxDropdown } from 'components/stable/gux-dropdown/gux-dropdown';
import { GuxListbox } from 'components/stable/gux-listbox/gux-listbox';
import { GuxOption } from 'components/stable/gux-listbox/gux-option/gux-option';

const components = [
  GuxPaginationItemsPerPageBeta,
  GuxDropdown,
  GuxListbox,
  GuxOption
];
const language = 'en';

describe('gux-pagination-items-per-page', () => {
  beforeEach(async () => {
    global.MutationObserver = MutationObserver;
  });

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
