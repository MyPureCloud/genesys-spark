import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

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
          <gux-pagination-items-per-page
            items-per-page="${itemsPerPage}">
          </gux-pagination-items-per-page>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxPaginationItemsPerPage);

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
