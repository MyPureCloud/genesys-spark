import { EventEmitter, JSX } from '../../../stencil-public-runtime';
/**
 * @slot tab-list - Slot for gux-tab-advanced-list element
 * @slot - collection of gux-tab-advanced-panel elements
 */
export declare class GuxTabsAdvanced {
  private root;
  tabList: HTMLGuxTabAdvancedListElement;
  tabPanels: HTMLGuxTabAdvancedPanelElement[];
  /**
   * tabId of the currently selected tab
   */
  activeTab: string;
  /**
   * Triggers when the active tab changes.
   */
  guxactivetabchange: EventEmitter<string>;
  watchActiveTab(newValue: string): void;
  onInternalActivateTabPanel(event: CustomEvent): void;
  guxActivate(tabId: string): Promise<void>;
  private onSlotchange;
  private activateTab;
  componentWillLoad(): void;
  render(): JSX.Element;
}
