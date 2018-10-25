import { GenesysPaginationItemCounts } from './genesys-pagination-item-counts';

describe('genesys-pagination-item-counts', () => {
  let component: GenesysPaginationItemCounts;

  beforeEach(() => {
    component = new GenesysPaginationItemCounts();
  });

  it('builds with sensible defaults', () => {
    expect(component).toBeTruthy();
    expect(component.render()).toBeTruthy();

    expect(component.currentPage).toBe(1);
    expect(component.itemsPerPage).toBe(25);
  });

  describe('when calculating firstItem', () => {
    it('should be able to handle the first page', () => {
      expect(component.firstItem).toBe(1);
    });

    it('should be able to handle the second page', () => {
      component.currentPage = 2;
      expect(component.firstItem).toBe(26);
    });

    it('should be able to handle aribitrary page numbers', () => {
      component.currentPage = 5;
      expect(component.firstItem).toBe(101);
    });

    it('should be able to handle changing the items per page', () => {
      component.currentPage = 5;
      component.itemsPerPage = 10;
      expect(component.firstItem).toBe(41);
    });
  });

  describe('when calculating lastItem', () => {
    it('should be able to handle the first page', () => {
      expect(component.lastItem).toBe(25);
    });

    it('should be able to handle the second page', () => {
      component.currentPage = 2;
      expect(component.lastItem).toBe(50);
    });

    it('should be able to handle aribitrary page numbers', () => {
      component.currentPage = 5;
      expect(component.lastItem).toBe(125);
    });

    it('should be able to handle changing the items per page', () => {
      component.currentPage = 5;
      component.itemsPerPage = 10;
      expect(component.lastItem).toBe(50);
    });
  });
});
