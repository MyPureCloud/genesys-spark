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

import { GuxTabsOrientation, GuxTabsAlignment } from './gux-tabs-types';

/**
 * @slot tab-list - Slot for gux-tab-list
 * @slot - collection of gux-tab-panel elements
 */

@Component({
  styleUrl: 'gux-tabs.scss',
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
    this.activateTab(newValue, this.tabList, this.tabPanels);
    this.guxactivetabchange.emit(newValue);
  }

  @Watch('orientation')
  watchOrientation(value: string) {
    this.setOrientation(value);
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

    this.tabList = tabListSlot.assignedElements()[0] as HTMLGuxTabListElement;
    this.tabPanels = defaultSlot.assignedElements() as HTMLGuxTabPanelElement[];

    this.activateTab(this.activeTab, this.tabList, this.tabPanels);
    this.setOrientation(this.orientation);
  }

  private setOrientation(orientation) {
    this.addOrientationToClassList(this.tabList, orientation);
    const tabs = this.root.querySelectorAll('gux-tab');
    tabs.forEach(tab => {
      this.addOrientationToClassList(tab, orientation);
    });
  }

  private addOrientationToClassList(element, orientation) {
    if (orientation === 'vertical') {
      element.classList.add('gux-vertical');
      element.classList.remove('gux-horizontal');
    } else {
      element.classList.add('gux-horizontal');
      element.classList.remove('gux-vertical');
    }
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

    void tabList?.guxSetActive(this.activeTab);
    panels?.forEach(
      panel => void panel.guxSetActive(panel.tabId === this.activeTab)
    );
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <Host class={`gux-tabs-${this.orientation}`}>
        <div class={`gux-tabs gux-${this.alignment} gux-${this.orientation}`}>
          <slot name="tab-list"></slot>
          <div
            class={`gux-${this.alignment} gux-${this.orientation} gux-panel-container`}
          >
            <slot onSlotchange={this.onSlotchange.bind(this)}></slot>
          </div>
        </div>
      </Host>
    ) as JSX.Element;
  }
}
