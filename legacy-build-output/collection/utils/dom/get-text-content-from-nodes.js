export function getTextContentFromNodes(elements) {
  return elements
    .reduce((acc, cv) => {
    if (cv.nodeName === 'SLOT') {
      const slotElements = cv.assignedNodes();
      return acc.concat(getTextContentFromNodes(slotElements));
    }
    return acc.concat(cv.textContent);
  }, [])
    .map(s => s.trim())
    .join(' ');
}
