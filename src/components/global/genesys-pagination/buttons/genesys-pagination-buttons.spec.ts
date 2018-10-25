import { GenesysPaginationButtons } from './genesys-pagination-buttons';

describe('genesys-pagination-buttons', () => {
  let component: GenesysPaginationButtons;
  let pageChangedSpy;

  it('builds', () => {
    expect(new GenesysPaginationButtons()).toBeTruthy();
  });

  describe('nextPage', () => {
    beforeEach(() => {
      component = new GenesysPaginationButtons();

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

      it('should not emit a page changed event', () => {
        expect(pageChangedSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('previousPage', () => {
    beforeEach(() => {
      component = new GenesysPaginationButtons();

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

      it('should not emit a page changed event', () => {
        expect(pageChangedSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('firstPage', () => {
    beforeEach(() => {
      component = new GenesysPaginationButtons();

      pageChangedSpy = jest.fn();
      component.pageChanged = {
        emit: pageChangedSpy
      };
    });

    describe('successful changes', () => {
      beforeEach(() => {
        component.currentPage = 3;
        component.totalPages = 5;

        component.firstPage();
      });

      it('should change to the first page', () => {
        expect(component.currentPage).toEqual(1);
      });

      it('should emit a page changed event', () => {
        expect(pageChangedSpy).toHaveBeenCalledWith(1);
      });
    });

    describe('unsuccessful changes', () => {
      beforeEach(() => {
        component.currentPage = 1;
        component.totalPages = 5;

        component.firstPage();
      });

      it('should not emit a page changed event', () => {
        expect(pageChangedSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('lastPage', () => {
    beforeEach(() => {
      component = new GenesysPaginationButtons();

      pageChangedSpy = jest.fn();
      component.pageChanged = {
        emit: pageChangedSpy
      };
    });

    describe('successful changes', () => {
      beforeEach(() => {
        component.currentPage = 3;
        component.totalPages = 5;

        component.lastPage();
      });

      it('should change to the first page', () => {
        expect(component.currentPage).toEqual(5);
      });

      it('should emit a page changed event', () => {
        expect(pageChangedSpy).toHaveBeenCalledWith(5);
      });
    });

    describe('unsuccessful changes', () => {
      beforeEach(() => {
        component.currentPage = 5;
        component.totalPages = 5;

        component.lastPage();
      });

      it('should not emit a page changed event', () => {
        expect(pageChangedSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('setPage', () => {
    beforeEach(() => {
      component = new GenesysPaginationButtons();

      pageChangedSpy = jest.fn();
      component.pageChanged = {
        emit: pageChangedSpy
      };
    });

    describe('successful changes', () => {
      beforeEach(() => {
        component.currentPage = 3;
        component.totalPages = 5;

        component.setPage(2);
      });

      it('should set the current page property', () => {
        expect(component.currentPage).toBe(2);
      });
    });

    describe('when attempting to set the page before the first page', () => {
      beforeEach(() => {
        component.currentPage = 3;
        component.totalPages = 5;

        component.setPage(-1);
      });

      it('should set the property to the first page', () => {
        expect(component.currentPage).toBe(1);
      });
    });

    describe('when attempting to set the page past the last page', () => {
      beforeEach(() => {
        component.currentPage = 3;
        component.totalPages = 5;

        component.setPage(6);
      });

      it('should set the property to the last page', () => {
        expect(component.currentPage).toBe(5);
      });
    });
  });
});
