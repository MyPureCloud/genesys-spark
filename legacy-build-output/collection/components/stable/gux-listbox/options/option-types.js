/**
 * This list of valid option tags lets us derive both a union type for the tags
 * and a CSS selector for matching them in the DOM.
 */
const optionTypes = ['gux-option', 'gux-option-icon'];
/**
 * Useful CSS selector generated from the list of option tags.
 */
export const optionTagSelector = optionTypes.join(',');
