export const renderConfigs = [
  { currentPage: 1, totalItems: 1000, itemsPerPage: 25, layout: 'full' },
  { currentPage: 1, totalItems: 1000, itemsPerPage: 50, layout: 'full' },
  { currentPage: 1, totalItems: 1000, itemsPerPage: 75, layout: 'full' },
  { currentPage: 1, totalItems: 1000, itemsPerPage: 100, layout: 'full' },
  { currentPage: 1, totalItems: 1000, itemsPerPage: 25, layout: 'full' },
  { currentPage: 10, totalItems: 1000, itemsPerPage: 25, layout: 'full' },
  { currentPage: 10, totalItems: 1000, itemsPerPage: 50, layout: 'full' },
  { currentPage: 10, totalItems: 1000, itemsPerPage: 75, layout: 'full' },
  { currentPage: 10, totalItems: 1000, itemsPerPage: 100, layout: 'full' },
  { currentPage: 1, totalItems: 1000, itemsPerPage: 25, layout: 'small' },
  { currentPage: 1, totalItems: 1000, itemsPerPage: 25, layout: 'expanded' },
  { currentPage: -3, totalItems: 1000, itemsPerPage: 25, layout: 'full' },
  { currentPage: -3, totalItems: 1, itemsPerPage: 25, layout: 'full' },
  { currentPage: 1, totalItems: 0, itemsPerPage: 25, layout: 'full' }
].map(({ currentPage, totalItems, itemsPerPage, layout }) => {
  return {
    html: `
    <gux-pagination-legacy
      current-page="${currentPage}"
      total-items="${totalItems}"
      items-per-page="${itemsPerPage}"
      layout="${layout}"
    ></gux-pagination-legacy>`
  };
});
