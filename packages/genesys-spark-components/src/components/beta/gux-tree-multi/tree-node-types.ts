/**
 * This is the interface tree items are required to adhere to. It's mostly a
 * collection of states for the individual elements that needs to be queried
 * or set by the tree.
 */
export interface TreeNodeMultiElement extends HTMLElement {
  value?: string;
  disabled: boolean;
  filtered: boolean;
  active: boolean;
  selected: boolean;
  indeterminate?: boolean;
  expanded?: boolean;
}
