import { GenesysPagination } from './genesys-pagination';

describe('genesys-pagination', () => {
  it('builds', () => {
    expect(new GenesysPagination()).toBeTruthy();
  });

  describe('nextPage', () => {
    it('should increment the current page', () => {
      const component = new GenesysPagination();
      component.currentPage = 2;
      component.totalPages = 5;

      component.nextPage();
      expect(component.currentPage).toEqual(3);
    });
  });
});
