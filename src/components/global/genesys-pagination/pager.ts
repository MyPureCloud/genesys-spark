export interface Pager {
  firstPage(): void;
  nextPage(): void;
  previousPage(): void;
  lastPage(): void;

  setPage(page: number): void;
}
