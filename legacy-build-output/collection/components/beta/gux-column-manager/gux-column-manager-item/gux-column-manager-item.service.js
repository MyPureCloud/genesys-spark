export function getNewIndex(oldIndex, dropIndex, mouseOnTopHalfOfDropElement) {
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
