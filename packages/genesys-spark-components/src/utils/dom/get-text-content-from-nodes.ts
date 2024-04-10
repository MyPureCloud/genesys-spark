export function getTextContentFromNodes(elements: Node[]): string {
  return elements
    .reduce((acc, cv) => {
      if (cv.nodeName === 'SLOT') {
        const slotElements = (cv as HTMLSlotElement).assignedNodes();
        return acc.concat(getTextContentFromNodes(slotElements));
      }

      return acc.concat(cv.textContent);
    }, [] as string[])
    .map(s => s.trim())
    .join(' ');
}
