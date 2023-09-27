import { newSpecPage } from '@test/specTestUtils';
import { GuxPaginationItemCountsLegacy } from '../gux-pagination-item-counts';

const components = [GuxPaginationItemCountsLegacy];
const language = 'en';

describe('gux-pagination-item-counts-legacy', () => {
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
          <gux-pagination-item-counts-legacy
            total-items="${totalItems}"
            current-page="${currentPage}"
            items-per-page="${itemsPerPage}"
          >
          </gux-pagination-item-counts-legacy>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxPaginationItemCountsLegacy);

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
