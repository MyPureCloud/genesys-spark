export type GuxPaginationLayout = 'simple' | 'advanced';

export type GuxItemsPerPage = 25 | 50 | 75 | 100;

export type GuxPaginationState = {
  currentPage: number;
  itemsPerPage: number;
};
