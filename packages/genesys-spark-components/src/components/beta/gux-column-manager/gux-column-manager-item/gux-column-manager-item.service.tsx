export function getNewIndex(
  oldIndex: number,
  dropIndex: number,
  mouseOnTopHalfOfDropElement: boolean
): number {
  if (oldIndex < dropIndex) {
    if (mouseOnTopHalfOfDropElement) {
      return dropIndex - 1;
    }

    return dropIndex;
  }

  if (mouseOnTopHalfOfDropElement) {
    return dropIndex;
  }

  return dropIndex + 1;
}
