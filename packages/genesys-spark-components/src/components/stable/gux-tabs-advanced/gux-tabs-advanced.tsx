import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Listen,
  Method,
  Prop,
  State,
  Watch
} from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot tab-list - Slot for gux-tab-advanced-list element
 * @slot - collection of gux-tab-advanced-panel elements
 */

@Component({
  tag: 'gux-tabs-advanced',
  shadow: true
})
export class GuxTabsAdvanced {
  @Element()
  private root: HTMLElement;

  @State()
  tabList: HTMLGuxTabAdvancedListElement;

  @State()
  tabPanels: HTMLGuxTabAdvancedPanelElement[] = [];

  /**
   * tabId of the currently selected tab
   */
  @Prop({ mutable: true })
  activeTab: string;

  /**
   * Triggers when the active tab changes.
   */
  @Event()
  guxactivetabchange: EventEmitter<string>;

  @Watch('activeTab')
  watchActiveTab(newValue: string) {
    this.activateTab(newValue, this.tabList, this.tabPanels);
    this.guxactivetabchange.emit(newValue);
  }

  @Listen('internalactivatetabpanel')
  onInternalActivateTabPanel(event: CustomEvent): void {
    event.stopPropagation();

    const tabId = event.detail as string;

    this.activateTab(tabId, this.tabList, this.tabPanels);
  }

  @Method()
  // eslint-disable-next-line @typescript-eslint/require-await
  async guxActivate(tabId: string): Promise<void> {
    this.activateTab(tabId, this.tabList, this.tabPanels);
  }

  private onSlotchange(): void {
    const [tabListSlot, defaultSlot] = Array.from(
      this.root.shadowRoot.querySelectorAll('slot')
    );

    this.tabList =
      tabListSlot.assignedElements()[0] as HTMLGuxTabAdvancedListElement;
    this.tabPanels =
      defaultSlot.assignedElements() as HTMLGuxTabAdvancedPanelElement[];

    this.activateTab(this.activeTab, this.tabList, this.tabPanels);
  }

  private activateTab(
    tabId: string,
    tabList: HTMLGuxTabAdvancedListElement,
    panels: HTMLGuxTabAdvancedPanelElement[]
  ): void {
    if (tabId) {
      this.activeTab = tabId;
    } else {
      this.activeTab = tabList
        ?.querySelector('gux-tab-advanced')
        ?.getAttribute('tab-id');
    }

    void tabList.guxSetActive(this.activeTab);
    panels.forEach(
      panel => void panel.guxSetActive(panel.tabId === this.activeTab)
    );
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <Host>
        <slot name="tab-list"></slot>
        <slot onSlotchange={this.onSlotchange.bind(this)}></slot>
      </Host>
    ) as JSX.Element;
  }
}
