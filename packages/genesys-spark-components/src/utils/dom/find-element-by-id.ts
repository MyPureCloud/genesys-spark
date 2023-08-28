function getContainingDocument(node: Node): Document | DocumentFragment | null {
  if (node.nodeType === Node.DOCUMENT_NODE) {
    return node as Document;
  }
  if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    return node as DocumentFragment;
  }
  return node.ownerDocument;
}

export function findElementById(
  root: HTMLElement,
  forElementId: string
): HTMLElement {
  let priorRoot = null;
  let rootNode = root.getRootNode();
  let forElement: HTMLElement;

  while (rootNode && rootNode !== priorRoot && !forElement) {
    const doc = getContainingDocument(rootNode);
    forElement = doc?.getElementById(forElementId);
    // Keep track of the prior root to stop if a node returns itself as its root
    priorRoot = rootNode;
    rootNode = rootNode.getRootNode();
  }
  return forElement;
}
