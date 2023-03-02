import { EventEmitter, JSX } from '../../../stencil-public-runtime';
import { GuxTabsOrientation, GuxTabsAlignment } from './gux-tabs-types';
/**
 * @slot tab-list - Slot for gux-tab-list
 * @slot - collection of gux-tab-panel elements
 */
export declare class GuxTabs {
  root: HTMLElement;
  /**
   * tabId of the currently selected tab
   */
  activeTab: string;
  /**
   * Specifies horizontal or vertical orientation of tabs
   */
  orientation: GuxTabsOrientation;
  /**
   * Specifies left aligned, centered, or full width tabs
   */
  alignment: GuxTabsAlignment;
  tabList: HTMLGuxTabListElement;
  tabPanels: HTMLGuxTabPanelElement[];
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
