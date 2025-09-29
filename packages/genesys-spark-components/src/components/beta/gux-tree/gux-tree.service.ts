import { TreeNodeElement } from './tree-node-types';

export function getTreeNodes(tree: HTMLGuxTreeBetaElement): TreeNodeElement[] {
  const nodes: TreeNodeElement[] = [];

  function getNodes(element: Element): void {
    for (const child of Array.from(element.children)) {
      if (isNode(child)) {
        nodes.push(child as TreeNodeElement);
      }

      if (isNodeBranch(child)) {
        getNodes(child);
      }
    }
  }

  getNodes(tree);

  return nodes;
}

export function getAvailableTreeNodes(
  tree: HTMLGuxTreeBetaElement
): TreeNodeElement[] {
  return getTreeNodes(tree).filter(node => {
    return !node.disabled && !node.filtered;
  });
}

export function isNodeBranch(item: Element): boolean {
  return item.tagName === 'GUX-BRANCH';
}

export function isNode(item: Element): boolean {
  const nodeTypes = ['GUX-LEAF', 'GUX-BRANCH'];
  return nodeTypes.includes(item.tagName);
}

function getFirstSelectedNode(tree: HTMLGuxTreeBetaElement): TreeNodeElement {
  return getTreeNodes(tree).find(
    node => node.selected && !node.disabled && !node.filtered
  );
}

function getActiveNode(tree: HTMLGuxTreeBetaElement): TreeNodeElement {
  return getTreeNodes(tree).find(node => node.active);
}

function setActiveNode(
  tree: HTMLGuxTreeBetaElement,
  element: TreeNodeElement
): void {
  if (element) {
    getTreeNodes(tree).forEach(node => {
      const active = (!node.disabled || !node.filtered) && node === element;
      node.active = active;

      if (active) {
        tree.setAttribute('aria-activedescendant', node.id);
      }
    });
    element.scrollIntoView({ block: 'nearest' });
  }
}

function getFirstNode(tree: HTMLGuxTreeBetaElement): TreeNodeElement {
  return getAvailableTreeNodes(tree)[0];
}

function getNextNode(tree: HTMLGuxTreeBetaElement): TreeNodeElement {
  if (hasActiveNode(tree) && getActiveNode(tree) !== getLastNode(tree)) {
    const availableTreeNodes = getAvailableTreeNodes(tree);
    const activeNode = getActiveNode(tree);
    const activeNodeIndex = availableTreeNodes.indexOf(activeNode);

    return availableTreeNodes[activeNodeIndex + 1];
  }

  return getFirstNode(tree);
}

function getPreviousNode(tree: HTMLGuxTreeBetaElement): TreeNodeElement {
  if (hasActiveNode(tree)) {
    const availableNodesList = getAvailableTreeNodes(tree);
    const activeNodeIndex = availableNodesList.indexOf(getActiveNode(tree));

    if (getActiveNode(tree) === getFirstNode(tree)) {
      return getLastNode(tree);
    }

    return availableNodesList[activeNodeIndex - 1];
  }

  return getFirstNode(tree);
}

function getLastNode(tree: HTMLGuxTreeBetaElement): TreeNodeElement {
  const availableNodes = getAvailableTreeNodes(tree);
  return availableNodes[availableNodes.length - 1];
}

export function hasActiveNode(tree: HTMLGuxTreeBetaElement): boolean {
  return Boolean(getActiveNode(tree));
}

export function clearActiveNodes(tree: HTMLGuxTreeBetaElement): void {
  getTreeNodes(tree).forEach(node => {
    node.active = false;
  });
}

export function setInitialActiveNode(tree: HTMLGuxTreeBetaElement) {
  setActiveNode(tree, getFirstSelectedNode(tree) || getFirstNode(tree));
}

export function hasPreviousNode(tree: HTMLGuxTreeBetaElement): boolean {
  if (hasActiveNode(tree)) {
    return Boolean(getPreviousNode(tree));
  }

  return false;
}

export function hasNextNode(tree: HTMLGuxTreeBetaElement): boolean {
  if (hasActiveNode(tree)) {
    return Boolean(getNextNode(tree));
  }

  return false;
}

export function setFirstNodeActive(tree: HTMLGuxTreeBetaElement): void {
  setActiveNode(tree, getFirstNode(tree));
}

export function setNextNodeActive(tree: HTMLGuxTreeBetaElement): void {
  setActiveNode(tree, getNextNode(tree));
}

export function setPreviousNodeActive(tree: HTMLGuxTreeBetaElement): void {
  setActiveNode(tree, getPreviousNode(tree));
}

export function setLastNodeActive(tree: HTMLGuxTreeBetaElement): void {
  setActiveNode(tree, getLastNode(tree));
}

export function actOnActiveNode(
  tree: HTMLGuxTreeBetaElement,
  handler: (value: string) => void
): void {
  if (hasActiveNode(tree)) {
    handler(getActiveNode(tree).value);
  }
}

export function onClickedNode(
  node: HTMLGuxTreeBetaElement,
  handler: (value: string) => void
): void {
  handler(node.value);
}

export function matchNode(
  node: HTMLGuxTreeBetaElement,
  matchString: string
): boolean {
  //The text content needs to be trimmed as white space can occur around the textContent if nodes are populated asynchronously.
  return getNodeDefaultSlot(node)
    ?.textContent.trim()
    .toLowerCase()
    .startsWith(matchString.toLowerCase());
}

export function getNodeDefaultSlot(
  node: HTMLGuxTreeBetaElement
): Node | undefined {
  return node.shadowRoot.querySelector('slot')?.assignedNodes()[0];
}

export function convertValueToArray(value: string): string[] {
  return value ? value.split(',') : [];
}
