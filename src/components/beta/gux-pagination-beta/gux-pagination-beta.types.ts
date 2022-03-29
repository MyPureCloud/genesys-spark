export type GuxItemsPerPage = 25 | 50 | 75 | 100;

export type GuxPaginationLayoutBeta = 'simple' | 'advanced';

export type GuxPaginationState = {
  currentPage: number;
  itemsPerPage: number;
};
