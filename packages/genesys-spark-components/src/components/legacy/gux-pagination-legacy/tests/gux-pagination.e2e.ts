import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { newSparkE2EPage, a11yCheck } from '../../../../test/e2eTestUtils';

async function newNonrandomE2EPage({
  html
}: {
  html: string;
}): Promise<E2EPage> {
  const page = await newE2EPage();

  await page.evaluateOnNewDocument(() => {
    Math.random = () => 0.5;
  });
  await page.setContent(html);
  await page.waitForChanges();

  return page;
}

describe('gux-pagination-legacy', () => {
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
      const html = `
        <gux-pagination-legacy lang="en"
          current-page="${currentPage}"
          total-items="${totalItems}"
          items-per-page="${itemsPerPage}"
          layout="${layout}"
        ></gux-pagination-legacy>
      `;

      it.skip(`should render as expected (${index + 1})`, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-pagination-legacy');

        expect(element.outerHTML).toMatchSnapshot();
      });

      it(`should be accessible (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page);
      });
    });
  });
});
