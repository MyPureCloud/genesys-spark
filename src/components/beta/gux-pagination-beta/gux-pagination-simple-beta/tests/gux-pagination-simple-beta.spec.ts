import { newSpecPage } from '@stencil/core/testing';
import { GuxPaginationSimpleBeta } from '../gux-pagination-simple-beta';

describe('gux-pagination-simple-beta', () => {
  let page: SpecPage;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [GuxPaginationSimpleBeta],
      html: `
      <gux-pagination-simple-beta>
        total-items=123
        current-page=1
        items-per-page=25
        pages-unknown=false
        total-pages=4
      </gux-pagination-simple-beta>
      `,
      language: 'en'
    });
  });

  it('should build', async () => {
    expect(page.rootInstance).toBeInstanceOf(GuxPaginationSimpleBeta);
  });

  it('should render', async () => {
    expect(page.root).toMatchSnapshot();
  });
});
