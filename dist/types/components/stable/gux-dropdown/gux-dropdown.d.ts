import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { GuxFilterTypes } from './gux-dropdown.types';
/**
 * @slot - for a gux-listbox containing gux-option children
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
  focusSelectedItemAfterRender(expanded: boolean): void;
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
  private renderFilterInputField;
  private renderPopup;
  private renderTarget;
  private renderTargetContent;
  private renderRadialLoading;
  render(): JSX.Element;
}
