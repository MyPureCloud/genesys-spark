import { GenesysPagination } from './genesys-pagination';

describe('genesys-pagination', () => {
  let component: GenesysPagination;
  let pageChangedSpy;

  it('builds', () => {
    expect(new GenesysPagination()).toBeTruthy();
  });

  describe('nextPage', () => {
    beforeEach(() => {
      component = new GenesysPagination();

      pageChangedSpy = jest.fn();
      component.pageChanged = {
        emit: pageChangedSpy
      };
    });

    describe('successful changes', () => {
      beforeEach(() => {
        component.currentPage = 2;
        component.totalPages = 5;

        component.nextPage();
      });

      it('should increment the current page', () => {
        expect(component.currentPage).toEqual(3);
      });

      it('should emit a page changed event', () => {
        expect(pageChangedSpy).toHaveBeenCalledWith(3);
      });
    });

    describe('unsuccessful changes', () => {
      beforeEach(() => {
        component.currentPage = 5;
        component.totalPages = 5;

        component.nextPage();
      });

      it('should not increment past the last page', () => {
        expect(component.currentPage).toEqual(5);
      });
    });
  });

  describe('nextPage', () => {
    beforeEach(() => {
      component = new GenesysPagination();

      pageChangedSpy = jest.fn();
      component.pageChanged = {
        emit: pageChangedSpy
      };
    });

    describe('successful changes', () => {
      beforeEach(() => {
        component.currentPage = 3;
        component.totalPages = 5;

        component.previousPage();
      });

      it('should increment the current page', () => {
        expect(component.currentPage).toEqual(2);
      });

      it('should emit a page changed event', () => {
        expect(pageChangedSpy).toHaveBeenCalledWith(2);
      });
    });

    describe('unsuccessful changes', () => {
      beforeEach(() => {
        component.currentPage = 1;
        component.totalPages = 5;

        component.previousPage();
      });

      it('should not decrement past the first page', () => {
        expect(component.currentPage).toEqual(1);
      });
    });
  });
});
