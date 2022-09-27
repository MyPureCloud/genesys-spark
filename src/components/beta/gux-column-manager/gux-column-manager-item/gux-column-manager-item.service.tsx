export function getNewIndex(
  oldIndex: number,
  dropIndex: number,
  topOnTop: boolean
): number {
  if (oldIndex < dropIndex) {
    if (topOnTop) {
      return dropIndex - 1;
    }

    return dropIndex;
  }

  if (topOnTop) {
    return dropIndex;
  }

  return dropIndex + 1;
}
