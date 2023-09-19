import { newSpecPage } from '@stencil/core/testing';
import MutationObserver from 'mutation-observer';

import { GuxPaginationLegacy } from '../gux-pagination';
import { GuxButton } from '../../../stable/gux-button/gux-button';
import { GuxDropdown } from '../../../stable/gux-dropdown/gux-dropdown';
import { GuxListbox } from '../../../stable/gux-listbox/gux-listbox';
import { GuxOption } from '../../../stable/gux-listbox/options/gux-option/gux-option';
import { GuxPaginationButtonsLegacy } from '../gux-pagination-buttons-legacy/gux-pagination-buttons';
import { GuxPaginationItemCountsLegacy } from '../gux-pagination-item-counts-legacy/gux-pagination-item-counts';
import { GuxPaginationItemsPerPageLegacy } from '../gux-pagination-items-per-page-legacy/gux-pagination-items-per-page';

const components = [
  GuxButton,
  GuxDropdown,
  GuxListbox,
  GuxOption,
  GuxPaginationLegacy,
  GuxPaginationButtonsLegacy,
  GuxPaginationItemCountsLegacy,
  GuxPaginationItemsPerPageLegacy
];

const language = 'en';

describe('gux-pagination-legacy', () => {
  beforeEach(() => {
    (
      global as NodeJS.Global & {
        MutationObserver: any;
      }
    ).MutationObserver = MutationObserver;
  });
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
      { currentPage: -3, totalItems: 1, itemsPerPage: 25, layout: 'full' }
    ].forEach(({ currentPage, totalItems, itemsPerPage, layout }, index) => {
      it(`should render as expected (${index + 1})`, async () => {
        const html = `
          <gux-pagination-legacy
            current-page="${currentPage}"
            total-items="${totalItems}"
            items-per-page="${itemsPerPage}"
            layout="${layout}"
          ></gux-pagination-legacy>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxPaginationLegacy);

        expect(page.root).toMatchSnapshot();
      });
    });
    it(`should render current page as 1 when total items is 0`, async () => {
      const html = `
      <gux-pagination-legacy
      current-page="1"
      total-items="0"
      items-per-page="25"
      layout="full"
    ></gux-pagination-legacy>
      `;

      const page = await newSpecPage({ components, html, language });

      expect(page.rootInstance).toBeInstanceOf(GuxPaginationLegacy);

      expect(page.root).toMatchSnapshot();
    });
  });
});
