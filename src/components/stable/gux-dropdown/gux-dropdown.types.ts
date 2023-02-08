export type GuxFilterTypes = 'none' | 'starts-with' | 'custom';

/**
 * This defines all of the valid option elements that can be used in `gux-dropdown`
 * To add a new dropdown option, create a component for it and add it's tag name
 * to the list below. You'll get a complier error in the places that need to be
 * updated to handle the new option type.
 *
 * Option elements should also adhere to the ListboxOptionElement interface defined
 * in gux-listbox/gux-listbox.service.ts
 */
export const validOptionTags = ['gux-option'] as const;
// This derives a union of tag names from the validOptionTags list.
export type ValidOptionTag = (typeof validOptionTags)[number];
// All option types must have a `value` attribute to work correctly.
export interface OptionInterface extends HTMLElement {
  value: string;
}
