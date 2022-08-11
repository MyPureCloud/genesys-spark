import { newSpecPage } from '@stencil/core/testing';
import { GuxPaginationItemCountsBeta } from '../gux-pagination-item-counts-beta';

const components = [GuxPaginationItemCountsBeta];
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
          <gux-pagination-item-counts-beta
            total-items="${totalItems}"
            current-page="${currentPage}"
            items-per-page="${itemsPerPage}"
          >
          </gux-pagination-item-counts-beta>
        `;
        const page = await newSpecPage({ components, html, language });

        expect(page.rootInstance).toBeInstanceOf(GuxPaginationItemCountsBeta);

        expect(page.root).toMatchSnapshot();
      });
    });
  });
});
