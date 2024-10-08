import { newSpecPage } from '@test/specTestUtils';
import { GuxPagination } from '../gux-pagination';

import { GuxButton } from '../../gux-button/gux-button';
import { GuxDropdown } from '../../gux-dropdown/gux-dropdown';
import { GuxListbox } from '../../gux-listbox/gux-listbox';
import { GuxOption } from '../../gux-listbox/options/gux-option/gux-option';
import { GuxPaginationButtons } from '../gux-pagination-buttons/gux-pagination-buttons';
import { GuxPaginationItemCounts } from '../gux-pagination-item-counts/gux-pagination-item-counts';
import { GuxPaginationItemsPerPage } from '../gux-pagination-items-per-page/gux-pagination-items-per-page';

const components = [
  GuxButton,
  GuxDropdown,
  GuxListbox,
  GuxOption,
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
      {
        currentPage: 1,
        totalItems: 1000,
        itemsPerPage: 25,
        layout: 'advanced'
      },
      {
        currentPage: 1,
        totalItems: 1000,
        itemsPerPage: 25,
        layout: 'advanced',
        disabled: true
      },
      {
        currentPage: 1,
        totalItems: 1000,
        itemsPerPage: 50,
        layout: 'advanced'
      },
      {
        currentPage: 1,
        totalItems: 1000,
        itemsPerPage: 75,
        layout: 'advanced'
      },
      {
        currentPage: 1,
        totalItems: 1000,
        itemsPerPage: 100,
        layout: 'advanced'
      },
      {
        currentPage: 1,
        totalItems: 1000,
        itemsPerPage: 25,
        layout: 'advanced'
      },
      {
        currentPage: 10,
        totalItems: 1000,
        itemsPerPage: 25,
        layout: 'advanced'
      },
      {
        currentPage: 10,
        totalItems: 1000,
        itemsPerPage: 50,
        layout: 'advanced'
      },
      {
        currentPage: 10,
        totalItems: 1000,
        itemsPerPage: 75,
        layout: 'advanced'
      },
      {
        currentPage: 10,
        totalItems: 1000,
        itemsPerPage: 100,
        layout: 'advanced'
      },
      {
        currentPage: 1,
        totalItems: 1000,
        itemsPerPage: 25,
        layout: 'simple'
      },
      {
        currentPage: 1,
        totalItems: 1000,
        itemsPerPage: 25,
        layout: 'simple',
        disabled: true
      },
      {
        currentPage: -3,
        totalItems: 1000,
        itemsPerPage: 25,
        layout: 'advanced'
      },
      {
        currentPage: -3,
        totalItems: 0,
        itemsPerPage: 25,
        layout: 'advanced'
      }
    ].forEach(
      (
        { currentPage, totalItems, itemsPerPage, layout, disabled = false },
        index
      ) => {
        it(`should render as expected (${index + 1})`, async () => {
          const html = `
          <gux-pagination
            current-page="${currentPage}"
            total-items="${totalItems}"
            items-per-page="${itemsPerPage}"
            layout="${layout}"
            disabled="${disabled}"
          ></gux-pagination>
        `;
          const page = await newSpecPage({ components, html, language });

          expect(page.rootInstance).toBeInstanceOf(GuxPagination);

          expect(page.root).toMatchSnapshot();
        });
      }
    );
    it(`should render current page as 1 when total items is 0`, async () => {
      const html = `
      <gux-pagination
      current-page="1"
      total-items="0"
      items-per-page="25"
      layout="full"
    ></gux-pagination>
      `;

      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxPagination);

      expect(page.root).toMatchSnapshot();
    });
  });
});
