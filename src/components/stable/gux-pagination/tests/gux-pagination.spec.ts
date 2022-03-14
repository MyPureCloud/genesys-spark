import { newSpecPage } from '@stencil/core/testing';
import { GuxPagination } from '../gux-pagination';

import { GuxButton } from '../../gux-button/gux-button';
import { GuxDropdownV2Beta } from '../../../beta/gux-dropdown-v2/gux-dropdown-v2';
import { GuxListbox } from '../../../beta/gux-listbox/gux-listbox';
import { GuxOptionV2 } from '../../../beta/gux-listbox/gux-option-v2/gux-option-v2';
import { GuxOption } from '../../gux-dropdown/gux-option/gux-option';
import { GuxPaginationButtons } from '../gux-pagination-buttons/gux-pagination-buttons';
import { GuxPaginationItemCounts } from '../gux-pagination-item-counts/gux-pagination-item-counts';
import { GuxPaginationItemsPerPage } from '../gux-pagination-items-per-page/gux-pagination-items-per-page';

const components = [
  GuxButton,
  GuxDropdownV2Beta,
  GuxListbox,
  GuxOptionV2,
  GuxOption,
  GuxPagination,
  GuxPaginationButtons,
  GuxPaginationItemCounts,
  GuxPaginationItemsPerPage
];

const language = 'en';

describe('gux-pagination', () => {
  describe('#render', () => {
    [
      { currentPage: 1, totalItems: 1000, itemsPerPage: 25, layout: 'full' },
      { currentPage: 1, totalItems: 1000, itemsPerPage: 50, layout: 'full' },
      { currentPage: 1, totalItems: 1000, itemsPerPage: 75, layout: 'full' },
      { currentPage: 1, totalItems: 1000, itemsPerPage: 100, layout: 'full' },
      { currentPage: 1, totalItems: 1000, itemsPerPage: 25, layout: 'full' },
      { currentPage: 10, totalItems: 1000, itemsPerPage: 25, layout: 'full' },
      { currentPage: 10, totalItems: 1000, itemsPerPage: 50, layout: 'full' },
      { currentPage: 10, totalItems: 1000, itemsPerPage: 75, layout: 'full' },
      { currentPage: 10, totalItems: 1000, itemsPerPage: 100, layout: 'full' },
      { currentPage: 1, totalItems: 1000, itemsPerPage: 25, layout: 'small' },
      { currentPage: -3, totalItems: 1000, itemsPerPage: 25, layout: 'full' },
      { currentPage: -3, totalItems: 0, itemsPerPage: 25, layout: 'full' }
    ].forEach(({ currentPage, totalItems, itemsPerPage, layout }, index) => {
      it(`should render as expected (${index + 1})`, async () => {
        const html = `
          <gux-pagination
            current-page="${currentPage}"
            total-items="${totalItems}"
            items-per-page="${itemsPerPage}"
            layout="${layout}"
          ></gux-pagination>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxPagination);

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
