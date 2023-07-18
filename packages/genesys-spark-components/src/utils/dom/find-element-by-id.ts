export function findElementById(
  root: HTMLElement,
  forElementId: string
): HTMLElement {
  let priorRoot = null;
  let rootNode = root.getRootNode();
  let forElement: HTMLElement;

  while (rootNode && rootNode !== priorRoot && !forElement) {
    const doc: Document =
      rootNode.nodeType === Node.DOCUMENT_NODE || Node.DOCUMENT_FRAGMENT_NODE
        ? (rootNode as Document)
        : rootNode.ownerDocument;
    forElement = doc?.getElementById(forElementId);
    // Keep track of the prior root to stop if a node returns itself as its root
    priorRoot = rootNode;
    rootNode = rootNode.getRootNode();
  }
  return forElement;
}
