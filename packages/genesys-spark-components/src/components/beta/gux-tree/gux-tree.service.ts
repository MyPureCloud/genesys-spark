import { whenEventIsFrom } from '@utils/dom/when-event-is-from';

import { TreeNodeElement } from './tree-node-types';
import { randomHTMLId } from '@utils/dom/random-html-id';
// Utility functions for node type checking
function isNode(item: Element): boolean {
  const nodeTypes = ['GUX-LEAF', 'GUX-BRANCH'];
  return nodeTypes.includes(item.tagName);
}

function isBranchNode(item: Element): boolean {
  return item.tagName === 'GUX-BRANCH';
}

function isOpenBranchNode(item: Element): boolean {
  if (item.tagName === 'GUX-BRANCH') {
    return (item as HTMLGuxBranchElement).expanded;
  }

  return false;
}

function hasActiveNode(tree: HTMLGuxTreeBetaElement): boolean {
  return Boolean(getActiveNode(tree));
}

// Core tree traversal functions
function getAllTreeNodes(tree: HTMLGuxTreeBetaElement): TreeNodeElement[] {
  const nodes: TreeNodeElement[] = [];

  function getNodes(element: Element): void {
    for (const child of Array.from(element.children)) {
      if (isNode(child)) {
        const node = child as TreeNodeElement;
        if (!node.value) {
          node.value = randomHTMLId('gux-tree-node');
        }
        nodes.push(child as TreeNodeElement);
      }

      if (isBranchNode(child)) {
        getNodes(child);
      }
    }
  }

  getNodes(tree);

  return nodes;
}

function getTreeNodes(tree: HTMLGuxTreeBetaElement): TreeNodeElement[] {
  const nodes: TreeNodeElement[] = [];

  function getNodes(element: Element): void {
    for (const child of Array.from(element.children)) {
      if (isNode(child)) {
        nodes.push(child as TreeNodeElement);
      }

      if (isOpenBranchNode(child)) {
        getNodes(child);
      }
    }
  }

  getNodes(tree);

  return nodes;
}

function getAvailableTreeNodes(
  tree: HTMLGuxTreeBetaElement
): TreeNodeElement[] {
  const availableTreeNodes = getTreeNodes(tree).filter(node => {
    return !node.disabled && !node.filtered;
  });

  return availableTreeNodes;
}

// Node getter functions
function getActiveNode(tree: HTMLGuxTreeBetaElement): TreeNodeElement {
  return getTreeNodes(tree).find(node => node.active);
}

function getFirstSelectedNode(tree: HTMLGuxTreeBetaElement): TreeNodeElement {
  return getTreeNodes(tree).find(
    node => node.selected && !node.disabled && !node.filtered
  );
}

function getFirstNode(tree: HTMLGuxTreeBetaElement): TreeNodeElement {
  return getAvailableTreeNodes(tree)[0];
}

function getLastNode(tree: HTMLGuxTreeBetaElement): TreeNodeElement {
  const availableNodes = getAvailableTreeNodes(tree);
  return availableNodes[availableNodes.length - 1];
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

function getNodeByValue(
  tree: HTMLGuxTreeBetaElement,
  value: string
): TreeNodeElement {
  return getAllTreeNodes(tree).find(node => node.value === value);
}

// Core setter functions
function setActiveNode(
  tree: HTMLGuxTreeBetaElement,
  element: TreeNodeElement
): void {
  if (element) {
    getTreeNodes(tree).forEach(node => {
      const active = !node.disabled && !node.filtered && node === element;
      node.active = active;

      if (active) {
        tree.setAttribute('aria-activedescendant', node.id);
      }
    });
    element.scrollIntoView({ block: 'nearest' });
  }
}

function expandAllParents(element: TreeNodeElement): void {
  let parent = element.parentElement.closest('gux-branch');

  while (parent) {
    parent.expanded = true;
    parent = parent.parentElement.closest('gux-branch');
  }
}

// Public API - Active node management
export function setInitialActiveNode(tree: HTMLGuxTreeBetaElement) {
  setActiveNode(tree, getFirstSelectedNode(tree) || getFirstNode(tree));
}

export function setFirstNodeActive(tree: HTMLGuxTreeBetaElement): void {
  setActiveNode(tree, getFirstNode(tree));
}

export function setLastNodeActive(tree: HTMLGuxTreeBetaElement): void {
  setActiveNode(tree, getLastNode(tree));
}

export function setNextNodeActive(tree: HTMLGuxTreeBetaElement): void {
  setActiveNode(tree, getNextNode(tree));
}

export function setPreviousNodeActive(tree: HTMLGuxTreeBetaElement): void {
  setActiveNode(tree, getPreviousNode(tree));
}

export function setParentNodeActive(tree: HTMLGuxTreeBetaElement): void {
  const activeNode = getActiveNode(tree);
  const parentNode = activeNode.parentElement.closest('gux-branch');

  setActiveNode(tree, parentNode);
}

export function setChildNodeActive(tree: HTMLGuxTreeBetaElement): void {
  const branch = getActiveNode(tree) as HTMLGuxBranchElement;
  const availableNodes = getAvailableTreeNodes(branch);

  if (availableNodes[0]) {
    setActiveNode(tree, availableNodes[0]);
  }
}

// Public API - Selection management
export function setSelectedNode(
  tree: HTMLGuxTreeBetaElement,
  element: TreeNodeElement
): void {
  if (element?.value) {
    getTreeNodes(tree).forEach(node => {
      node.selected = node === element;
    });

    tree.value = element.value;
    element.scrollIntoView({ block: 'nearest' });
  }
}

export function setSelectedNodeByValue(
  tree: HTMLGuxTreeBetaElement,
  value: string
): void {
  const element = getNodeByValue(tree, value);
  if (element) {
    expandAllParents(element);
    setSelectedNode(tree, element);
  }
}

// Public API - Event handling
export function handleTreeNodeSpecificEvent({
  event,
  onLeaf,
  onBranch
}: {
  event: Event | PointerEvent | KeyboardEvent;
  onLeaf: (leaf: HTMLGuxLeafElement) => void;
  onBranch: (branch: HTMLGuxBranchElement) => void;
}): void {
  let eventFromLeaf = false;
  whenEventIsFrom('gux-leaf', event, (leaf: HTMLGuxLeafElement) => {
    if (leaf.value) {
      onLeaf(leaf);
      eventFromLeaf = true;
    }
  });
  if (!eventFromLeaf) {
    whenEventIsFrom('gux-branch', event, (branch: HTMLGuxBranchElement) => {
      onBranch(branch);
    });
  }
}

// Unused functions - commented out for potential future use
/*
export function clearActiveNodes(tree: HTMLGuxTreeBetaElement): void {
  getTreeNodes(tree).forEach(node => {
    node.active = false;
  });
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

export function actOnActiveNode(
  tree: HTMLGuxTreeBetaElement,
  handler: (value: string) => void
): void {
  if (hasActiveNode(tree)) {
    handler(getActiveNode(tree).value);
  }
}

export function ifNodeHasValue(
  node: TreeNodeElement,
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
*/
