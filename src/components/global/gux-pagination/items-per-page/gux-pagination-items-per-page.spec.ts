import { GuxPaginationItemsPerPage } from './gux-pagination-items-per-page';

describe('gux-pagination-item-counts', () => {
  let component: GuxPaginationItemsPerPage;
  let itemsPerPageChangedSpy: jest.Mock;

  beforeEach(() => {
    component = new GuxPaginationItemsPerPage();

    itemsPerPageChangedSpy = jest.fn();
    component.itemsPerPageChanged = {
      emit: itemsPerPageChangedSpy
    };
  });

  it('builds with sensible defaults', () => {
    expect(component).toBeTruthy();
    expect(component.render()).toBeTruthy();

    expect(component.itemsPerPage).toBe(25);
    expect(component.itemsPerPageOptions).toEqual([25, 50, 100]);
  });
});
