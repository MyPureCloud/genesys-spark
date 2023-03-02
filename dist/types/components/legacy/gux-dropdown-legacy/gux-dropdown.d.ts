import { EventEmitter, JSX } from '../../../stencil-public-runtime';
export declare class GuxDropdownLegacy {
  root: HTMLElement;
  textFieldElement: HTMLInputElement;
  /**
   * Sets the select mode (default, page or palette).
   */
  mode: 'default' | 'page' | 'palette';
  /**
   * Disable the input and prevent interactions.
   */
  disabled: boolean;
  /**
   * Indicate the dropdown input value
   */
  value: string;
  /**
   * The dropdown placeholder.
   */
  placeholder: string;
  /**
   * Whether the user can filter or not.
   */
  filterable: boolean;
  opened: boolean;
  forcedGhostValue: string;
  srLabeledBy: string;
  inputIsFocused: boolean;
  valueEdited: boolean;
  /**
   * Emits when selection is changed.
   */
  change: EventEmitter<string>;
  emitChange(value: string): void;
  onClickOutside(e: MouseEvent): void;
  setLabeledBy(id: string): Promise<void>;
  setSelected(): Promise<void>;
  onMutation(): void;
  onKeyDown(event: KeyboardEvent): void;
  setValue(text: string, value: string): void;
  _clickHandler(): void;
  _focusHandler(): void;
  _optionFocusedHandler(e: FocusEvent): void;
  private optionSelectedHandler;
  private optionKeyDownHandler;
  _blurHandler(): void;
  _inputHandler(inputEvent: Event): void;
  getFilteredItems(): HTMLGuxOptionLegacyElement[];
  getSuggestionText(filter?: string): string;
  componentWillLoad(): void;
  componentDidLoad(): void;
  private getSelectionOptions;
  render(): JSX.Element;
  private getFocusIndex;
  private searchHighlightAndFilter;
}
