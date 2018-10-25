import { GenesysPagination } from './genesys-pagination';

describe('genesys-pagination', () => {
  let component: GenesysPagination;

  beforeEach(() => {
    component = new GenesysPagination();

    component.pageChanged = {
      emit: jest.fn()
    };
  });

  it('builds', () => {
    expect(component).toBeTruthy();
    expect(component.render()).toBeTruthy();
  });

  describe('setPage', () => {
    describe('successful changes', () => {
      beforeEach(() => {
        component.currentPage = 3;
        component.totalItems = 101;

        component.setPage(2);
      });

      it('should set the current page property', () => {
        expect(component.currentPage).toBe(2);
      });
    });

    describe('when attempting to set the page before the first page', () => {
      beforeEach(() => {
        component.currentPage = 3;
        component.totalItems = 101;

        component.setPage(-1);
      });

      it('should set the property to the first page', () => {
        expect(component.currentPage).toBe(1);
      });
    });

    describe('when attempting to set the page past the last page', () => {
      beforeEach(() => {
        component.currentPage = 3;
        component.totalItems = 101;

        component.setPage(6);
      });

      it('should set the property to the last page', () => {
        expect(component.currentPage).toBe(5);
      });
    });
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
