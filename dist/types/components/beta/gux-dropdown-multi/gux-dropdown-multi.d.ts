import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { GuxFilterTypes } from '../../stable/gux-dropdown/gux-dropdown.types';
/**
 * @slot - for a gux-listbox-multi containing gux-option-multi children
 */
export declare class GuxDropdownMulti {
  private i18n;
  private fieldButtonElement;
  private textInputElement;
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
  /**
   * Override default filtering behavior
   */
  filterType: GuxFilterTypes;
  hasError: boolean;
  hasCreate: boolean;
  private expanded;
  private textInput;
  /**
   * This event is emitted to request creating a new option
   */
  guxcreateoption: EventEmitter;
  /**
   * This event will run when the dropdown-multi transitions to an expanded state.
   */
  guxexpanded: EventEmitter<void>;
  /**
   * This event will run when the dropdown-multi transitions to a collapsed state.
   */
  guxcollapsed: EventEmitter<void>;
  private guxfilter;
  onMutation(): void;
  /**
   * Listens for expanded event emitted by gux-popup.
   */
  onInternalExpanded(event: CustomEvent): void;
  /**
   * Listens for collapsed event emitted by gux-popup.
   */
  onInternalCollapsed(event: CustomEvent): void;
  focusSelectedItemAfterRender(expanded: boolean): void;
  watchValue(newValue: string): void;
  handleFilter(filter: string): void;
  /**
   * Returns an array of the selected values
   */
  getSelectedValues(): Promise<string[]>;
  onKeydown(event: KeyboardEvent): void;
  /**
   * force update when slotted gux-listbox-multi listbox options change
   */
  onInternallistboxoptionsupdated(event: CustomEvent): void;
  /**
   * clear selected options when gux-dropdown-multi-tag emits event
   */
  onClearselected(event: CustomEvent): void;
  /**
   * emit guxcreateoption event when gux-create-option emits create event
   */
  onCreatenewoption(event: CustomEvent): void;
  onBlur(event: FocusEvent): void;
  onFocus(event: FocusEvent): void;
  onFocusout(event: FocusEvent): void;
  onFocusin(event: FocusEvent): void;
  onClickOutside(): void;
  connectedCallback(): void;
  componentWillLoad(): Promise<void>;
  componentDidLoad(): void;
  componentWillRender(): void;
  private validateValue;
  private hasTextInput;
  private applyListboxEventListeners;
  private isFilterable;
  private stopPropagationOfInternalFocusEvents;
  private getOptionElementByValue;
  private fieldButtonClick;
  private fieldButtonInputClick;
  private filterInput;
  private shiftTabFromExpandedFilterInput;
  private shiftTabFromFilterListbox;
  private emitCreateOption;
  /**
   * check if able to create new option from text input value
   */
  private canCreateNewOption;
  private isActiveElement;
  private activeElementNotListbox;
  private filterKeydown;
  private filterKeyup;
  private collapseListbox;
  private updateValue;
  private getTypeaheadText;
  private renderTargetDisplay;
  private getSrSelectedText;
  private getInputAriaLabel;
  private renderTag;
  private renderFilterInputField;
  private renderPopup;
  private renderTarget;
  private renderTargetContent;
  private renderRadialLoading;
  render(): JSX.Element;
}
