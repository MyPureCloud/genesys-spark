interface GuxPaginationButtonsExpandedPageListItem {
  pageNumber: number;
  display: string;
  current: boolean;
}

export class GuxPaginationButtonsService {
  static getPageList(
    currentPage: number,
    totalPages: number
  ): GuxPaginationButtonsExpandedPageListItem[] {
    if (totalPages <= 10) {
      return [...Array(totalPages).keys()].map(index => {
        const pageNumber = index + 1;

        return {
          pageNumber,
          display: String(pageNumber),
          current: pageNumber === currentPage
        };
      });
    }

    if (currentPage <= 5) {
      const startPageList = [...Array(6).keys()].map(index => {
        const pageNumber = index + 1;

        return {
          pageNumber,
          display: String(pageNumber),
          current: pageNumber === currentPage
        };
      });

      return [
        ...startPageList,
        {
          pageNumber: 7,
          display: '...',
          current: false
        },
        {
          pageNumber: totalPages,
          display: String(totalPages),
          current: false
        }
      ];
    }

    if (currentPage > totalPages - 5) {
      const endPageList = [...Array(6).keys()].map(index => {
        const pageNumber = index + totalPages - 5;

        return {
          pageNumber,
          display: String(pageNumber),
          current: pageNumber === currentPage
        };
      });

      return [
        {
          pageNumber: 1,
          display: '1',
          current: false
        },
        {
          pageNumber: totalPages - 6,
          display: '...',
          current: false
        },
        ...endPageList
      ];
    }

    const middlePageList = [...Array(5).keys()].map(index => {
      const pageNumber = index + currentPage - 2;

      return {
        pageNumber,
        display: String(pageNumber),
        current: pageNumber === currentPage
      };
    });

    return [
      {
        pageNumber: 1,
        display: '1',
        current: false
      },
      {
        pageNumber: currentPage - 3,
        display: '...',
        current: false
      },
      ...middlePageList,
      {
        pageNumber: currentPage + 3,
        display: '...',
        current: false
      },
      {
        pageNumber: totalPages,
        display: String(totalPages),
        current: false
      }
    ];
  }
}
