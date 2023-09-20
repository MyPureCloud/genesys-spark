import { newSpecPage } from '@stencil/core/testing';
import { GuxPaginationItemCounts } from '../gux-pagination-item-counts';

const components = [GuxPaginationItemCounts];
const language = 'en';

describe('gux-pagination-item-counts', () => {
  describe('#render', () => {
    [
      { totalItems: 0, currentPage: 0, itemsPerPage: 0 },
      { totalItems: 99, currentPage: 2, itemsPerPage: 25 },
      { totalItems: 99, currentPage: 2, itemsPerPage: 50 },
      { totalItems: 99, currentPage: 1, itemsPerPage: 100 },
      { totalItems: 0, currentPage: 2, itemsPerPage: 25 },
      { totalItems: 10, currentPage: 2, itemsPerPage: 25 }
    ].forEach(({ totalItems, currentPage, itemsPerPage }, index) => {
      it(`should render as expected (${index + 1})`, async () => {
        const html = `
          <gux-pagination-item-counts
            total-items="${totalItems}"
            current-page="${currentPage}"
            items-per-page="${itemsPerPage}"
          >
          </gux-pagination-item-counts>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxPaginationItemCounts);

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
