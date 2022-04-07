import { newSpecPage } from '@stencil/core/testing';
import { GuxPaginationBeta } from '../gux-pagination';

import { GuxButton } from '../../../stable/gux-button/gux-button';
import { GuxDropdownV2Beta } from '../../gux-dropdown-v2/gux-dropdown-v2';
import { GuxListbox } from '../../gux-listbox/gux-listbox';
import { GuxOptionV2 } from '../../gux-listbox/gux-option-v2/gux-option-v2';
import { GuxOption } from '../../../stable/gux-dropdown/gux-option/gux-option';
import { GuxPaginationButtonsBeta } from '../gux-pagination-buttons/gux-pagination-buttons';
import { GuxPaginationItemCountsBeta } from '../gux-pagination-item-counts/gux-pagination-item-counts';
import { GuxPaginationItemsPerPageBeta } from '../gux-pagination-items-per-page/gux-pagination-items-per-page';

const components = [
  GuxButton,
  GuxDropdownV2Beta,
  GuxListbox,
  GuxOptionV2,
  GuxOption,
  GuxPaginationBeta,
  GuxPaginationButtonsBeta,
  GuxPaginationItemCountsBeta,
  GuxPaginationItemsPerPageBeta
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
      { currentPage: 1, totalItems: 1000, itemsPerPage: 25, layout: 'simple' },
      {
        currentPage: -3,
        totalItems: 1000,
        itemsPerPage: 25,
        layout: 'advanced'
      },
      { currentPage: -3, totalItems: 0, itemsPerPage: 25, layout: 'advanced' }
    ].forEach(({ currentPage, totalItems, itemsPerPage, layout }, index) => {
      it(`should render as expected (${index + 1})`, async () => {
        const html = `
          <gux-pagination-beta
            current-page="${currentPage}"
            total-items="${totalItems}"
            items-per-page="${itemsPerPage}"
            layout="${layout}"
          ></gux-pagination-beta>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxPaginationBeta);

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
