import { EventEmitter, JSX } from '../../../../stencil-public-runtime';
export declare class GuxTabAdvancedList {
  private i18n;
  private triggerIds;
  root: HTMLElement;
  /**
   * Enable new tab button
   */
  showNewTabButton: boolean;
  /**
   * Maximum nuber of tabs created
   */
  tabLimit: number;
  /**
   * Enable tab sorting by drag/drop
   */
  allowSort: boolean;
  focused: number;
  /**
   * Disable new tab button event
   */
  disableAddTabButton: boolean;
  tabTriggers: NodeListOf<HTMLGuxTabAdvancedElement>;
  /**
   * Tabs show scrollbar when tabs overflow container
   */
  private hasScrollbar;
  /**
   * Keyboard sort has been triggered using space
   */
  private keyboardSort;
  /**
   * Index of sort target before sort starts
   */
  private initialSortIndex;
  /**
   * Selected target for sort
   */
  private sortTarget;
  /**
   * Translation key for aria live alert for keyboard sort
   */
  private ariaLiveAlert;
  /**
   * Triggers when the new tab button is selected.
   */
  newTab: EventEmitter;
  /**
   * Triggers when the sorting of the tabs is changed.
   */
  sortChanged: EventEmitter<string[]>;
  onFocusin(event: FocusEvent): void;
  onFocusout(event: FocusEvent): void;
  private sortableInstance?;
  private resizeObserver?;
  private domObserver?;
  onMutation(): void;
  onKeydown(event: KeyboardEvent): void;
  onKeyup(event: KeyboardEvent): void;
  guxSetActive(activeTab: string): Promise<void>;
  private focusTab;
  private setTabTriggers;
  createSortable(): void;
  destroySortable(): void;
  checkForScrollbarHideOrShow(): void;
  handleKeyboardScroll(direction: 'forward' | 'backward'): void;
  disconnectedCallback(): void;
  componentWillLoad(): Promise<void>;
  componentDidLoad(): void;
  scrollLeft(): void;
  scrollRight(): void;
  scrollUp(): void;
  scrollDown(): void;
  componentWillRender(): void;
  render(): JSX.Element;
  private renderScrollButton;
  private getScrollDirection;
  private getChevronIconName;
}
