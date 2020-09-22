import { newE2EPage } from '@stencil/core/testing';
import { E2EGuxDropdown } from '../../gux-dropdown/gux-dropdown.e2eelement';

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
      { currentPage: 1, totalItems: 1000, itemsPerPage: 25, layout: 'expanded' }
    ].forEach(({ currentPage, totalItems, itemsPerPage, layout }, index) => {
      it(`should render as expected (${index + 1})`, async () => {
        const html = `
          <gux-pagination lang="en"
            current-page="${currentPage}"
            total-items="${totalItems}"
            items-per-page="${itemsPerPage}"
            layout="${layout}"
          ></gux-pagination>
        `;
        const page = await newE2EPage({ html });
        const element = await page.find('gux-pagination');

        expect(element.innerHTML).toMatchSnapshot();
      });
    });
  });
});
