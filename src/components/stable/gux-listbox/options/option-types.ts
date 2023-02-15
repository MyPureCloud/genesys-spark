/**
 * This defines all of the valid option elements that can be used in `gux-dropdown`
 * To add a new dropdown option, create a component for it and add it's tag name
 * to the list below. You'll get a complier error in the places that need to be
 * updated to handle the new option type.
 *
 * Option elements should also adhere to the ListboxOptionElement
 */
export type ValidOptionTag = 'gux-option' | 'gux-option-icon';

/**
 * This is the interface listbox items are required to adhere to. It's mostly a
 * collection of states for the individual elements that needs to be queried
 * or set by the listbox.
 */
export interface ListboxOptionElement extends HTMLElement {
  active: boolean;
  disabled: boolean;
  filtered: boolean;
  hovered: boolean;
  selected: boolean;
  value: string;
}
