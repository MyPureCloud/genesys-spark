import { GuxPaginationButtonsService } from '../gux-pagination-button-beta.service';

describe('GuxPaginationButtonsService', () => {
  describe('#getPageList', () => {
    [
      {
        totalPages: 0,
        currentPage: 0,
        layout: 'advanced',
        expectedPageList: []
      },
      {
        totalPages: 1,
        currentPage: 1,
        layout: 'advanced',
        expectedPageList: [{ pageNumber: 1, display: '1', current: true }]
      },
      {
        totalPages: 2,
        currentPage: 1,
        layout: 'advanced',
        expectedPageList: [
          { pageNumber: 1, display: '1', current: true },
          { pageNumber: 2, display: '2', current: false }
        ]
      },
      {
        totalPages: 5,
        currentPage: 1,
        layout: 'advanced',
        expectedPageList: [
          { pageNumber: 1, display: '1', current: true },
          { pageNumber: 2, display: '2', current: false },
          { pageNumber: 3, display: '3', current: false },
          { pageNumber: 4, display: '4', current: false },
          { pageNumber: 5, display: '5', current: false }
        ]
      },
      {
        totalPages: 10,
        currentPage: 1,
        layout: 'advanced',
        expectedPageList: [
          { pageNumber: 1, display: '1', current: true },
          { pageNumber: 2, display: '2', current: false },
          { pageNumber: 3, display: '3', current: false },
          { pageNumber: 4, display: '4', current: false },
          { pageNumber: 5, display: '5', current: false },
          { pageNumber: 6, display: '...', current: false },
          { pageNumber: 10, display: '10', current: false }
        ]
      },
      {
        totalPages: 15,
        currentPage: 1,
        layout: 'advanced',
        expectedPageList: [
          { pageNumber: 1, display: '1', current: true },
          { pageNumber: 2, display: '2', current: false },
          { pageNumber: 3, display: '3', current: false },
          { pageNumber: 4, display: '4', current: false },
          { pageNumber: 5, display: '5', current: false },
          { pageNumber: 6, display: '...', current: false },
          { pageNumber: 15, display: '15', current: false }
        ]
      },
      {
        totalPages: 100,
        currentPage: 1,
        layout: 'advanced',
        expectedPageList: [
          { pageNumber: 1, display: '1', current: true },
          { pageNumber: 2, display: '2', current: false },
          { pageNumber: 3, display: '3', current: false },
          { pageNumber: 4, display: '4', current: false },
          { pageNumber: 5, display: '5', current: false },
          { pageNumber: 6, display: '...', current: false },
          { pageNumber: 100, display: '100', current: false }
        ]
      },
      {
        totalPages: 100,
        currentPage: 100,
        layout: 'advanced',
        expectedPageList: [
          { pageNumber: 1, display: '1', current: false },
          { pageNumber: 94, display: '...', current: false },
          { pageNumber: 96, display: '96', current: false },
          { pageNumber: 97, display: '97', current: false },
          { pageNumber: 98, display: '98', current: false },
          { pageNumber: 99, display: '99', current: false },
          { pageNumber: 100, display: '100', current: true }
        ]
      },
      {
        totalPages: 100,
        currentPage: 100,
        layout: 'advanced',
        expectedPageList: [
          { pageNumber: 1, display: '1', current: false },
          { pageNumber: 94, display: '...', current: false },
          { pageNumber: 96, display: '96', current: false },
          { pageNumber: 97, display: '97', current: false },
          { pageNumber: 98, display: '98', current: false },
          { pageNumber: 99, display: '99', current: false },
          { pageNumber: 100, display: '100', current: true }
        ]
      },
      {
        totalPages: 100,
        currentPage: 98,
        layout: 'advanced',
        expectedPageList: [
          { pageNumber: 1, display: '1', current: false },
          { pageNumber: 94, display: '...', current: false },
          { pageNumber: 96, display: '96', current: false },
          { pageNumber: 97, display: '97', current: false },
          { pageNumber: 98, display: '98', current: true },
          { pageNumber: 99, display: '99', current: false },
          { pageNumber: 100, display: '100', current: false }
        ]
      }
    ].forEach(
      ({ totalPages, currentPage, layout, expectedPageList }, index) => {
        it(`should render as expected (${index + 1})`, async () => {
          const pageList = GuxPaginationButtonsService.displayAllPageButtons(
            currentPage,
            totalPages,
            layout
          );

          expect(pageList).toEqual(expectedPageList);
        });
      }
    );
  });
});
