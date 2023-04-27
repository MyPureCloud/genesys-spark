import { EventEmitter } from '../../../stencil-public-runtime';
export declare class GuxTabsLegacy {
  /**
   * Enable tab sorting by drag/drop
   */
  allowSort: boolean;
  /**
   * Enable new tab button
   */
  showNewTabButton: boolean;
  /**
   * tabId of the currently selected tab
   */
  value: string;
  /**
   * Maximum nuber of tabs created
   */
  tabLimit: number;
  /**
   * Disable new tab button event
   */
  disableAddTabButton: boolean;
  /**
   * Triggers when the new tab button is selected.
   */
  newTab: EventEmitter;
  /**
   * Triggers when a tab is selected.
   */
  input: EventEmitter;
  /**
   * Triggers when the sorting of the tabs is changed.
   */
  sortChanged: EventEmitter<string[]>;
  private root;
  private hasScrollbar;
  private i18n;
  private sortableInstance?;
  private resizeObserver?;
  private domObserver?;
  watchHandler(newValue: string): void;
  internaltabselectedHandler(e: CustomEvent): void;
  createSortable(): void;
  destroySortable(): void;
  disconnectedCallback(): void;
  componentWillLoad(): Promise<void>;
  componentWillRender(): void;
  checkForScrollbarHideOrShow(): void;
  componentDidLoad(): void;
  componentDidRender(): void;
  scrollLeft(): void;
  scrollRight(): void;
  render(): any;
}
