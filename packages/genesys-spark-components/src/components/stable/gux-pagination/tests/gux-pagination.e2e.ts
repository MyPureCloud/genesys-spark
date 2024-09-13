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
      { currentPage: 1, totalItems: 1000, itemsPerPage: 25, layout: 'simple' }
    ].forEach(({ currentPage, totalItems, itemsPerPage, layout }, index) => {
      const html = `
        <gux-pagination lang="en"
          current-page="${currentPage}"
          total-items="${totalItems}"
          items-per-page="${itemsPerPage}"
          layout="${layout}"
        ></gux-pagination>
      `;

      it.skip(`should render as expected (${index + 1})`, async () => {
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-pagination');

        expect(element.outerHTML).toMatchSnapshot();
      });

      it(`should be accessible (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page);
      });
    });
  });
});
