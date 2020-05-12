import { newSpecPage } from '@stencil/core/testing';
import { GuxPaginationButtons } from '../gux-pagination-buttons';

describe('gux-pagination-buttons', () => {
  let component: GuxPaginationButtons;

  beforeEach(async () => {
    const page = await newSpecPage({
      components: [GuxPaginationButtons],
      html: `<gux-pagination-buttons></gux-pagination-buttons>`,
      language: 'en'
    });

    component = page.rootInstance;
  });

  it('should build', async () => {
    expect(component).toBeInstanceOf(GuxPaginationButtons);
  });

  it('should detect being on the first page', () => {
    component.currentPage = 1;

    expect(component.onFirstPage).toBeTruthy();
  });

  it('should detect not being on the first page', () => {
    component.currentPage = 2;

    expect(component.onFirstPage).toBeFalsy();
  });

  it('should detect being on the last page', () => {
    component.currentPage = 5;
    component.totalPages = 5;

    expect(component.onLastPage).toBeTruthy();
  });

  it('should detect not being on the last page', () => {
    component.currentPage = 2;
    component.totalPages = 5;

    expect(component.onLastPage).toBeFalsy();
  });
});
