interface GuxPaginationButtonsExpandedPageListItem {
  pageNumber: number;
  display: string;
  current: boolean;
}
export declare class GuxPaginationButtonsService {
  static getPageList(currentPage: number, totalPages: number): GuxPaginationButtonsExpandedPageListItem[];
}
export {};
