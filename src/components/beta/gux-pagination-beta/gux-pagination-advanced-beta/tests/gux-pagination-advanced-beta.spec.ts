import { newSpecPage } from '@stencil/core/testing';
import { GuxPaginationAdvancedBeta } from '../gux-pagination-advanced-beta';

describe('gux-pagination-advanced-beta', () => {
  let page: SpecPage;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [GuxPaginationAdvancedBeta],
      html: `
      <gux-pagination-advanced-beta>
        total-items=123
        current-page=1
        items-per-page=25
        pages-unknown=false
        total-pages=4
      </gux-pagination-advanced-beta>
      `,
      language: 'en'
    });
  });

  it('should build', async () => {
    expect(page.rootInstance).toBeInstanceOf(GuxPaginationAdvancedBeta);
  });

  it('should render', async () => {
    expect(page.root).toMatchSnapshot();
  });
});
