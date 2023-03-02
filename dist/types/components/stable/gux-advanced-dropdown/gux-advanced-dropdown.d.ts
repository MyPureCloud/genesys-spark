import { EventEmitter, JSX } from '../../../stencil-public-runtime';
/**
 * @slot - collection of gux-dropdown-option elements
 */
export declare class GuxAdvancedDropdown {
  root: HTMLElement;
  searchInput: HTMLInputElement;
  inputBox: HTMLElement;
  filterDebounceTimer: ReturnType<typeof setTimeout>;
  private i18n;
  /**
   * Disable the input and prevent interactions.
   */
  disabled: boolean;
  /**
   * The dropdown's placeholder.
   */
  placeholder: string;
  /**
   * Whether the list should filter its current options.
   */
  noFilter: boolean;
  /**
   * Timeout between filter input changed and event being emitted.
   */
  filterDebounceTimeout: number;
  /**
   * CSS string used to set the maximum height of the dropdown option container. Default is set to 10 options as defined by UX.
   */
  dropdownHeight: string;
  /**
   * Fires when the value of the advanced dropdown changes.
   */
  input: EventEmitter<string>;
  /**
   * Fires when the filter of the advanced dropdown changes.
   */
  filter: EventEmitter<string>;
  srLabelledby: string;
  opened: boolean;
  currentlySelectedOption: HTMLGuxDropdownOptionElement;
  selectionOptions: HTMLGuxDropdownOptionElement[];
  slotObserver: MutationObserver;
  watchValue(newValue: boolean): void;
  get value(): string;
  /**
   * Gets the currently selected values.
   *
   * @returns The array of selected values.
   */
  getSelectedValues(): Promise<string[]>;
  setLabeledBy(id: string): Promise<void>;
  onClickOutside(): void;
  componentWillLoad(): Promise<void>;
  disconnectedCallback(): void;
  render(): JSX.Element;
  private updateSelectionState;
  private addOptionListener;
  private handleSelectionChange;
  private getSelectionOptions;
  private inputMouseDown;
  private getFocusIndex;
  private optionsKeyDown;
  private inputKeyDown;
  private handleSearchInput;
  private searchRequested;
  private setFilteredOptions;
  private changeFocusToSearch;
  private openDropdown;
  private closeDropdown;
}
