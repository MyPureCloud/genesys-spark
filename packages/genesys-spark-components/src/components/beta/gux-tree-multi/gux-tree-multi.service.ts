import { whenEventIsFrom } from '@utils/dom/when-event-is-from';

import { TreeNodeMultiElement } from './tree-node-types';

// Utility functions for node type checking
function isNode(item: Element): boolean {
  const nodeTypes = ['GUX-LEAF-MULTI', 'GUX-BRANCH-MULTI'];
  return nodeTypes.includes(item.tagName);
}

function isBranchNode(item: Element): boolean {
  return item.tagName === 'GUX-BRANCH-MULTI';
}

function isOpenBranchNode(item: Element): boolean {
  if (item.tagName === 'GUX-BRANCH-MULTI') {
    return (item as HTMLGuxBranchMultiElement).expanded;
  }

  return false;
}

function hasActiveNode(tree: HTMLGuxTreeMultiBetaElement): boolean {
  return Boolean(getActiveNode(tree));
}

// Core tree traversal functions
function getAllTreeNodes(
  tree: HTMLGuxTreeMultiBetaElement
): TreeNodeMultiElement[] {
  const nodes: TreeNodeMultiElement[] = [];

  function getNodes(element: Element): void {
    for (const child of Array.from(element.children)) {
      if (isNode(child)) {
        nodes.push(child as TreeNodeMultiElement);
      }

      if (isBranchNode(child)) {
        getNodes(child);
      }
    }
  }

  getNodes(tree);

  return nodes;
}

function getTreeNodes(
  tree: HTMLGuxTreeMultiBetaElement
): TreeNodeMultiElement[] {
  const nodes: TreeNodeMultiElement[] = [];

  function getNodes(element: Element): void {
    for (const child of Array.from(element.children)) {
      if (isNode(child)) {
        nodes.push(child as TreeNodeMultiElement);
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
  tree: HTMLGuxTreeMultiBetaElement
): TreeNodeMultiElement[] {
  const availableTreeNodes = getTreeNodes(tree).filter(node => {
    return !node.disabled && !node.filtered;
  });

  return availableTreeNodes;
}

// Node getter functions
function getActiveNode(
  tree: HTMLGuxTreeMultiBetaElement
): TreeNodeMultiElement {
  return getTreeNodes(tree).find(node => node.active);
}

function getFirstSelectedNode(
  tree: HTMLGuxTreeMultiBetaElement
): TreeNodeMultiElement {
  return getTreeNodes(tree).find(
    node => node.selected && !node.disabled && !node.filtered
  );
}

function getFirstNode(tree: HTMLGuxTreeMultiBetaElement): TreeNodeMultiElement {
  return getAvailableTreeNodes(tree)[0];
}

function getLastNode(tree: HTMLGuxTreeMultiBetaElement): TreeNodeMultiElement {
  const availableNodes = getAvailableTreeNodes(tree);
  return availableNodes[availableNodes.length - 1];
}

function getNextNode(tree: HTMLGuxTreeMultiBetaElement): TreeNodeMultiElement {
  if (hasActiveNode(tree) && getActiveNode(tree) !== getLastNode(tree)) {
    const availableTreeNodes = getAvailableTreeNodes(tree);
    const activeNode = getActiveNode(tree);
    const activeNodeIndex = availableTreeNodes.indexOf(activeNode);

    return availableTreeNodes[activeNodeIndex + 1];
  }

  return getFirstNode(tree);
}

function getPreviousNode(
  tree: HTMLGuxTreeMultiBetaElement
): TreeNodeMultiElement {
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

function getChildNodes(branch: TreeNodeMultiElement): TreeNodeMultiElement[] {
  const nodes: TreeNodeMultiElement[] = [];

  function getNodes(element: Element): void {
    for (const child of Array.from(element.children)) {
      if (isNode(child)) {
        nodes.push(child as TreeNodeMultiElement);
      }

      if (isBranchNode(child)) {
        getNodes(child);
      }
    }
  }

  getNodes(branch);
  return nodes;
}

// Core setter functions
function setActiveNode(
  tree: HTMLGuxTreeMultiBetaElement,
  element: TreeNodeMultiElement
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

function expandAllParents(element: TreeNodeMultiElement): void {
  let parent = element.parentElement.closest('gux-branch-multi');

  while (parent) {
    parent.expanded = true;
    parent = parent.parentElement.closest('gux-branch-multi');
  }
}

function updateBranchState(branch: TreeNodeMultiElement): void {
  const childNodes = getChildNodes(branch);
  const selectedChildren = childNodes.filter(child => child.selected);

  if (selectedChildren.length === 0) {
    branch.selected = false;
    branch.indeterminate = false;
  } else if (selectedChildren.length === childNodes.length) {
    branch.selected = true;
    branch.indeterminate = false;
  } else {
    branch.selected = false;
    branch.indeterminate = true;
  }
}

function updateDescendants(node: Element, selected: boolean): void {
  for (const child of Array.from(node.children)) {
    if (isNode(child)) {
      const childNode = child as TreeNodeMultiElement;
      if (!childNode.disabled && !childNode.filtered) {
        childNode.selected = selected;
        childNode.indeterminate = false;
      }
    }
    if (isBranchNode(child)) {
      updateDescendants(child, selected);
    }
  }
}

function updateParentStates(node: TreeNodeMultiElement): void {
  let parent = node.parentElement.closest(
    'gux-branch-multi'
  ) as TreeNodeMultiElement;

  while (parent) {
    updateBranchState(parent);
    parent = parent.parentElement.closest(
      'gux-branch-multi'
    ) as TreeNodeMultiElement;
  }
}

function updateTreeValue(tree: HTMLGuxTreeMultiBetaElement): void {
  const selectedNodes = getAllTreeNodes(tree).filter(
    node => node.selected && node.value
  );
  tree.value = selectedNodes.map(node => node.value).join(',');
}

// Public API - Active node management
export function setInitialActiveNode(tree: HTMLGuxTreeMultiBetaElement) {
  setActiveNode(tree, getFirstSelectedNode(tree) || getFirstNode(tree));
}

export function setFirstNodeActive(tree: HTMLGuxTreeMultiBetaElement): void {
  setActiveNode(tree, getFirstNode(tree));
}

export function setLastNodeActive(tree: HTMLGuxTreeMultiBetaElement): void {
  setActiveNode(tree, getLastNode(tree));
}

export function setNextNodeActive(tree: HTMLGuxTreeMultiBetaElement): void {
  setActiveNode(tree, getNextNode(tree));
}

export function setPreviousNodeActive(tree: HTMLGuxTreeMultiBetaElement): void {
  setActiveNode(tree, getPreviousNode(tree));
}

export function setParentNodeActive(tree: HTMLGuxTreeMultiBetaElement): void {
  const activeNode = getActiveNode(tree);
  const parentNode = activeNode.parentElement.closest('gux-branch-multi');

  setActiveNode(tree, parentNode);
}

export function setChildNodeActive(tree: HTMLGuxTreeMultiBetaElement): void {
  const branch = getActiveNode(tree) as HTMLGuxBranchMultiElement;
  const availableNodes = getAvailableTreeNodes(tree).filter(node => {
    return branch.contains(node);
  });

  if (availableNodes[0]) {
    setActiveNode(tree, availableNodes[0]);
  }
}

// Public API - Selection management
export function toggleNodeSelection(
  tree: HTMLGuxTreeMultiBetaElement,
  element: TreeNodeMultiElement
): void {
  const newSelected = !element.selected;
  element.selected = newSelected;
  element.indeterminate = false;

  // If it's a branch, update all descendants
  if (isBranchNode(element)) {
    updateDescendants(element, newSelected);
  }

  // Update parent states
  updateParentStates(element);

  updateTreeValue(tree);

  element.scrollIntoView({ block: 'nearest' });
}

export function setSelectedNodesByValue(
  tree: HTMLGuxTreeMultiBetaElement,
  value: string
): void {
  const values = value.split(',').map(v => v.trim());
  const allNodes = getAllTreeNodes(tree);

  allNodes.forEach(node => {
    node.selected = values.includes(node.value);
    node.indeterminate = false;
  });

  // Update branch states and expand parents of selected nodes
  allNodes
    .filter(node => isBranchNode(node))
    .forEach(branch => {
      updateBranchState(branch);
    });

  expandSelectedNodes(tree);
}

export function expandSelectedNodes(tree: HTMLGuxTreeMultiBetaElement): void {
  const allNodes = getAllTreeNodes(tree);
  allNodes.forEach(node => {
    if (node.selected) {
      expandAllParents(node);
    }
  });
}

// Public API - Event handling
export function handleTreeNodeSpecificEvent({
  event,
  onLeaf,
  onBranch
}: {
  event: Event | PointerEvent | KeyboardEvent;
  onLeaf: (leaf: HTMLGuxLeafMultiElement) => void;
  onBranch: (branch: HTMLGuxBranchMultiElement) => void;
}): void {
  let eventFromLeaf = false;
  whenEventIsFrom('gux-leaf-multi', event, (leaf: HTMLGuxLeafMultiElement) => {
    if (leaf.value) {
      onLeaf(leaf);
      eventFromLeaf = true;
    }
  });
  if (!eventFromLeaf) {
    whenEventIsFrom(
      'gux-branch-multi',
      event,
      (branch: HTMLGuxBranchMultiElement) => {
        onBranch(branch);
      }
    );
  }
}
