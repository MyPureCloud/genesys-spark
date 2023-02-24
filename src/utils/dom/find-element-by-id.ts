export function findElementById(
  root: HTMLElement,
  forElementId: string
): HTMLElement {
  let rootNode = root.getRootNode();
  let forElement: HTMLElement;

  while (rootNode && !forElement) {
    forElement = (rootNode as Document)?.getElementById(forElementId);
    rootNode = rootNode.getRootNode();
  }
  return forElement;
}
