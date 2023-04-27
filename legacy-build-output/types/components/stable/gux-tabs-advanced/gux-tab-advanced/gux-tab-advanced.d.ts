import { EventEmitter, JSX } from '../../../../stencil-public-runtime';
/**
 * @slot default - gux-icon (optional) and text node (required)
 * @slot dropdown-options - optional slot for tab options, must slot a gux-list element with gux-list-item children
 */
export declare class GuxTabAdvanced {
  private buttonElement;
  private tabOptionsButtonElement;
  private tooltipTitleElement;
  private dropdownOptionsButtonId;
  private tabTitle;
  private focusinFromClick;
  private root;
  /**
   * unique id for the tab
   */
  tabId: string;
  /**
   * indicates whether or not the tab is selected
   */
  active: boolean;
  guxDisabled: boolean;
  private popoverHidden;
  private hasAnimated;
  onFocusin(event: FocusEvent): void;
  onFocusout(event: FocusEvent): void;
  onKeydown(event: KeyboardEvent): void;
  onKeyup(event: KeyboardEvent): void;
  onClick(event: MouseEvent): void;
  onMouseDown(): void;
  internalactivatetabpanel: EventEmitter<string>;
  guxSetActive(active: boolean): Promise<void>;
  guxGetActive(): Promise<boolean>;
  guxFocus(): Promise<void>;
  private get hasDropdownOptions();
  private focusFirstItemInPopupList;
  private toggleOptions;
  private onSelectDropdownOption;
  private i18n;
  componentWillLoad(): Promise<void>;
  componentDidLoad(): void;
  private popoverOnClick;
  private getDropdownOptions;
  render(): JSX.Element;
}
