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

import { trackComponent } from '../../../usage-tracking';

import { GuxTabsOrientation, GuxTabsAlignment } from './gux-tabs-types';

@Component({
  styleUrl: 'gux-tabs.less',
  tag: 'gux-tabs',
  shadow: true
})
export class GuxTabs {
  @Element()
  root: HTMLElement;

  /**
   * tabId of the currently selected tab
   */
  @Prop({ mutable: true })
  activeTab: string;
  /**
   * Specifies horizontal or vertical orientation of tabs
   */
  @Prop()
  orientation: GuxTabsOrientation = 'horizontal';

  /**
   * Specifies left aligned, centered, or full width tabs
   */
  @Prop()
  alignment: GuxTabsAlignment = 'left';

  @State()
  tabList: HTMLGuxTabListElement;

  @State()
  tabPanels: HTMLGuxTabPanelElement[] = [];

  /**
   * Triggers when the active tab changes.
   */
  @Event()
  guxactivetabchange: EventEmitter<string>;

  @Watch('activeTab')
  watchActiveTab(newValue: string) {
    this.guxactivetabchange.emit(newValue);
  }

  @Listen('internalactivatetabpanel')
  onInternalActivateTabPanel(event: CustomEvent): void {
    event.stopPropagation();

    this.activateTab(event.detail, this.tabList, this.tabPanels);
  }

  @Method()
  async guxActivate(tabId: string): Promise<void> {
    this.activateTab(tabId, this.tabList, this.tabPanels);
  }

  private onSlotchange(): void {
    const [tabListSlot, defaultSlot] = Array.from(
      this.root.shadowRoot.querySelectorAll('slot')
    );

    this.tabList = tabListSlot.assignedElements()[0] as HTMLGuxTabListElement;
    this.tabPanels = defaultSlot.assignedElements() as HTMLGuxTabPanelElement[];

    this.activateTab(this.activeTab, this.tabList, this.tabPanels);
  }

  private activateTab(
    tabId: string,
    tabList: HTMLGuxTabListElement,
    panels: HTMLGuxTabPanelElement[]
  ): void {
    if (tabId) {
      this.activeTab = tabId;
    } else {
      this.activeTab = panels[0].tabId;
    }

    tabList.guxSetActive(this.activeTab);
    panels.forEach(panel => panel.guxSetActive(panel.tabId === this.activeTab));
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <Host>
        <div class={`gux-tabs gux-${this.alignment} gux-${this.orientation}`}>
          <slot name="tab-list"></slot>
          <div class={`gux-${this.alignment} gux-${this.orientation}`}>
            <slot onSlotchange={this.onSlotchange.bind(this)}></slot>
          </div>
        </div>
      </Host>
    );
  }
}
