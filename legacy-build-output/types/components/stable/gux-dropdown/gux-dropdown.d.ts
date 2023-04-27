import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { ListboxOptionElement } from '../gux-listbox/options/option-types';
import { GuxFilterTypes } from './gux-dropdown.types';
/**
 * Our Dropdown component. In the most basic case, it's used with `gux-option` to give users
 * a list of text options to select from, but other types of options with different appearance
 * can be created by creating a new component and adding it to `validOptionTags` list in
 * gux-dropdown-types.ts, then following the resulting compiler errors.
 *
 * @slot - for a gux-listbox containing ValidDropdownOption children
 */
export declare class GuxDropdown {
  private i18n;
  private fieldButtonElement;
  private filterElement;
  private listboxElement;
  private root;
  value: string;
  disabled: boolean;
  required: boolean;
  loading: boolean;
  placeholder: string;
  /**
   * deprecated will be removed in v4 (COMUI-1369). Use filterType instead
   */
  filterable: boolean;
  filterType: GuxFilterTypes;
  hasError: boolean;
  private expanded;
  private filter;
  watchExpanded(expanded: boolean): void;
  watchValue(newValue: string): void;
  handleFilter(filter: string): void;
  onKeydown(event: KeyboardEvent): void;
  onInternallistboxoptionsupdated(event: CustomEvent): void;
  onBlur(event: FocusEvent): void;
  onFocus(event: FocusEvent): void;
  onFocusout(event: FocusEvent): void;
  onFocusin(event: FocusEvent): void;
  onClickOutside(): void;
  guxexpanded: EventEmitter<void>;
  guxcollapsed: EventEmitter<void>;
  private guxfilter;
  onMutation(): void;
  onInternalExpanded(event: CustomEvent): void;
  onInternalCollapsed(event: CustomEvent): void;
  connectedCallback(): void;
  componentWillLoad(): Promise<void>;
  componentDidLoad(): void;
  componentWillRender(): void;
  private validateValue;
  private applyListboxEventListeners;
  private stopPropagationOfInternalFocusEvents;
  private isFilterable;
  get optionElements(): Array<ListboxOptionElement>;
  private getOptionElementByValue;
  private fieldButtonClick;
  private filterInput;
  private shiftTabFromExpandedFilterInput;
  private shiftTabFromFilterListbox;
  private activeElementNotListbox;
  private filterKeydown;
  private filterKeyup;
  private collapseListbox;
  private updateValue;
  private getTypeaheadText;
  private renderTargetDisplay;
  /**
   * Renders the selection display for the selected item. This function needs a branch to handle
   * each type defined in GuxDropdownOptionType
   *
   * @param item The selected item. This can be any of the node types defined in GuxDropdownOptionType.
   * @returns Rendered selection details.
   */
  private renderSelectedItem;
  private renderIconOption;
  private renderFilterInputField;
  private renderPopup;
  private renderTarget;
  private renderTargetContent;
  private renderRadialLoading;
  render(): JSX.Element;
}
