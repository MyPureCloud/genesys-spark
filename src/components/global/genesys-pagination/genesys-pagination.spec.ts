import { GenesysPagination } from './genesys-pagination';

describe('genesys-pagination', () => {
  let component: GenesysPagination;

  beforeEach(() => {
    component = new GenesysPagination();
  });

  it('builds', () => {
    expect(component).toBeTruthy();
    expect(component.render()).toBeTruthy();
  });

  describe('totalPages', () => {
    beforeEach(() => {
      component.totalItems = 25;
      component.itemsPerPage = 7;
    });

    it('should calculate the total pages', () => {
      expect(component.totalPages).toBe(4);
    });
  });
});
