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

import { GuxTabsOrientation, GuxTabsAlignment } from './gux-tabs-beta.types';

@Component({
  styleUrl: 'gux-tabs-beta.less',
  tag: 'gux-tabs-beta',
  shadow: true
})
export class GuxTabsBeta {
  @Element()
  root: HTMLElement;

  @Prop({ mutable: true })
  activeTab: string;

  @Prop()
  orientation: GuxTabsOrientation = 'horizontal';

  @Prop()
  alignment: GuxTabsAlignment = 'left';

  @State()
  tabList: HTMLGuxTabListBetaElement;

  @State()
  tabPanels: HTMLGuxTabPanelBetaElement[] = [];

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

    this.tabList =
      tabListSlot.assignedElements()[0] as HTMLGuxTabListBetaElement;
    this.tabPanels =
      defaultSlot.assignedElements() as HTMLGuxTabPanelBetaElement[];

    this.activateTab(this.activeTab, this.tabList, this.tabPanels);
  }

  private activateTab(
    tabId: string,
    tabList: HTMLGuxTabListBetaElement,
    panels: HTMLGuxTabPanelBetaElement[]
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
