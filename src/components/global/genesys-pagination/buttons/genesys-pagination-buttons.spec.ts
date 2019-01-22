import { GenesysPaginationButtons } from './genesys-pagination-buttons';

describe('genesys-pagination-buttons', () => {
  it('builds', () => {
    const component = new GenesysPaginationButtons();
    expect(component).toBeTruthy();
    expect(component.render()).toBeTruthy();
  });

  it('should detect being on the first page', () => {
    const component = new GenesysPaginationButtons();
    component.currentPage = 1;
    expect(component.onFirstPage).toBeTruthy();
  });

  it('should detect not being on the first page', () => {
    const component = new GenesysPaginationButtons();
    component.currentPage = 2;
    expect(component.onFirstPage).toBeFalsy();
  });

  it('should detect being on the last page', () => {
    const component = new GenesysPaginationButtons();
    component.currentPage = 5;
    component.totalPages = 5;
    expect(component.onLastPage).toBeTruthy();
  });

  it('should detect not being on the last page', () => {
    const component = new GenesysPaginationButtons();
    component.currentPage = 2;
    component.totalPages = 5;
    expect(component.onLastPage).toBeFalsy();
  });
});
