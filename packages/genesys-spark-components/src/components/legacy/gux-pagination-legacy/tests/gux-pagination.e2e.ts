import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { a11yCheck } from '../../../../test/e2eTestUtils';

const axeExclusions = [
  {
    issueId: 'duplicate-id',
    exclusionReason:
      'Test uses seeded value for Math.random, so duplicate ids are expected'
  }
];

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
  await page.addScriptTag({
    path: '../../node_modules/axe-core/axe.min.js'
  });
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
      it(`should render as expected (${index + 1})`, async () => {
        const html = `
          <gux-pagination-legacy lang="en"
            current-page="${currentPage}"
            total-items="${totalItems}"
            items-per-page="${itemsPerPage}"
            layout="${layout}"
          ></gux-pagination-legacy>
        `;
        const page = await newNonrandomE2EPage({ html });
        const element = await page.find('gux-pagination-legacy');
        await a11yCheck(page, axeExclusions);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });
});
