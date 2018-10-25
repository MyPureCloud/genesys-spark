import { GenesysPaginationItemsPerPage } from './genesys-pagination-items-per-page';

describe('genesys-pagination-item-counts', () => {
  let component: GenesysPaginationItemsPerPage;
  let itemsPerPageChangedSpy: jest.Mock;

  beforeEach(() => {
    component = new GenesysPaginationItemsPerPage();

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
