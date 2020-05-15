import { newSpecPage } from '@stencil/core/testing';
import { GuxPaginationItemsPerPage } from '../gux-pagination-items-per-page';

describe('gux-pagination-items-per-page', () => {
  let component: GuxPaginationItemsPerPage;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxPaginationItemsPerPage],
      html: `<gux-pagination-items-per-page></gux-pagination-items-per-page>`,
      language: 'en'
    });

    component = page.rootInstance;
    component.itemsPerPageChanged = {
      emit: jest.fn()
    };
  });

  it('should build with sensible defaults', () => {
    expect(component).toBeTruthy();
    expect(component.render()).toBeTruthy();

    expect(component.itemsPerPage).toBe(25);
    expect(component.itemsPerPageOptions).toEqual([25, 50, 75, 100]);
  });
});
