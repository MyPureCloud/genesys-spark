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
  styleUrl: 'gux-tabs-advanced.scss',
  tag: 'gux-tabs-advanced-legacy',
  shadow: true
})
export class GuxTabsAdvancedLegacy {
  @Element()
  private root: HTMLElement;

  @State()
  tabList: HTMLGuxTabAdvancedListLegacyElement;

  @State()
  tabPanels: HTMLGuxTabAdvancedPanelLegacyElement[] = [];

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

  // eslint-disable-next-line @typescript-eslint/require-await
  @Method()
  async guxActivate(tabId: string): Promise<void> {
    this.activateTab(tabId, this.tabList, this.tabPanels);
  }

  private onSlotchange(): void {
    const [tabListSlot, defaultSlot] = Array.from(
      this.root.shadowRoot.querySelectorAll('slot')
    );

    this.tabList =
      tabListSlot.assignedElements()[0] as HTMLGuxTabAdvancedListLegacyElement;
    this.tabPanels =
      defaultSlot.assignedElements() as HTMLGuxTabAdvancedPanelLegacyElement[];

    this.activateTab(this.activeTab, this.tabList, this.tabPanels);
  }

  private activateTab(
    tabId: string,
    tabList: HTMLGuxTabAdvancedListLegacyElement,
    panels: HTMLGuxTabAdvancedPanelLegacyElement[]
  ): void {
    if (tabId) {
      this.activeTab = tabId;
    } else {
      this.activeTab = tabList
        ?.querySelector('gux-tab-advanced-legacy')
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
        <div class="gux-tabs">
          <slot name="tab-list"></slot>
          <div>
            <slot onSlotchange={this.onSlotchange.bind(this)}></slot>
          </div>
        </div>
      </Host>
    ) as JSX.Element;
  }
}
