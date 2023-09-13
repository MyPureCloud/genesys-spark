interface GuxPaginationButtonsExpandedPageListItem {
  pageNumber: number;
  display: string;
  current: boolean;
}

export class GuxPaginationButtonsService {
  static displayAllPageButtons(
    currentPage: number,
    totalPages: number,
    layout: string
  ): GuxPaginationButtonsExpandedPageListItem[] {
    switch (layout) {
      case 'advanced':
        return getAdvancedList(currentPage, totalPages);
      case 'simple':
        return getSimpleList(currentPage, totalPages);
    }
  }
}

function getAdvancedList(
  currentPage: number,
  totalPages: number
): GuxPaginationButtonsExpandedPageListItem[] {
  if (totalPages <= 7) {
    return [...Array(totalPages).keys()].map(index => {
      const pageNumber = index + 1;

      return {
        pageNumber,
        display: String(pageNumber),
        current: pageNumber === currentPage
      };
    });
  }

  if (currentPage <= 3) {
    const startPageList = [...Array(5).keys()].map(index => {
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
        pageNumber: 6,
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

  if (currentPage > totalPages - 3) {
    const endPageList = [...Array(5).keys()].map(index => {
      const pageNumber = index + totalPages - 4;

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

  const middlePageList = [...Array(3).keys()].map(index => {
    const pageNumber = index + currentPage - 1;

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

function getSimpleList(
  currentPage: number,
  totalPages: number
): GuxPaginationButtonsExpandedPageListItem[] {
  if (totalPages <= 3) {
    return [...Array(totalPages).keys()].map(index => {
      const pageNumber = index + 1;

      return {
        pageNumber,
        display: String(pageNumber),
        current: pageNumber === currentPage
      };
    });
  }
  if (totalPages >= 4) {
    const startPageList = [...Array(1).keys()].map(index => {
      const pageNumber = index + currentPage;

      return {
        pageNumber,
        display: String(pageNumber),
        current: pageNumber !== totalPages
      };
    });
    return [
      ...startPageList,
      {
        pageNumber: currentPage,
        display: '...',
        current: false
      },
      {
        pageNumber: totalPages,
        display: String(totalPages),
        current: totalPages == currentPage
      }
    ];
  }
}
