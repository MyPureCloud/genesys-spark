import { newSpecPage } from '@stencil/core/testing';
import { GuxPaginationBeta } from '../gux-pagination-beta';

import { GuxButton } from '../../../stable/gux-button/gux-button';
import { GuxDropdown } from '../../../stable/gux-dropdown/gux-dropdown';
import { GuxListbox } from '../../../stable/gux-listbox/gux-listbox';
import { GuxOption } from '../../../stable/gux-listbox/options/gux-option/gux-option';
import { GuxPaginationButtonsBeta } from '../gux-pagination-buttons-beta/gux-pagination-buttons-beta';
import { GuxPaginationItemCountsBeta } from '../gux-pagination-item-counts-beta/gux-pagination-item-counts-beta';
import { GuxPaginationItemsPerPageBeta } from '../gux-pagination-items-per-page-beta/gux-pagination-items-per-page-beta';

const components = [
  GuxButton,
  GuxDropdown,
  GuxListbox,
  GuxOption,
  GuxOption,
  GuxPaginationBeta,
  GuxPaginationButtonsBeta,
  GuxPaginationItemCountsBeta,
  GuxPaginationItemsPerPageBeta
];

const language = 'en';

describe('gux-pagination-beta', () => {
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
    it(`should render current page as 1 when total items is 0`, async () => {
      const html = `
      <gux-pagination-beta
      current-page="1"
      total-items="0"
      items-per-page="25"
      layout="full"
    ></gux-pagination-beta>
      `;

      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxPaginationBeta);

      expect(page.root).toMatchSnapshot();
    });
  });
});
