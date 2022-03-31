export function calculateTotalPages(
  totalItems: number,
  itemsPerPage: number
): number {
  return Math.ceil(totalItems / itemsPerPage);
}

export function calculateCurrentPage(
  totalPages: number,
  currentPage: number
): number {
  const minCurrentPage = totalPages > 0 ? 1 : 0;

  return Math.max(minCurrentPage, Math.min(currentPage, totalPages));
}
