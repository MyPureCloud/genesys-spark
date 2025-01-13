import {
  Component,
  Element,
  h,
  Host,
  Listen,
  JSX,
  Prop,
  State,
  Watch,
  forceUpdate
} from '@stencil/core';

import simulateNativeEvent from '@utils/dom/simulate-native-event';
import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot - list of gux-segmented-control-item elements
 */
@Component({
  styleUrl: 'gux-segmented-control.scss',
  tag: 'gux-segmented-control-beta',
  shadow: true
})
export class GuxSegmentedControl {
  @Element()
  root: HTMLElement;

  @Prop({ mutable: true })
  value: string;

  @Prop()
  disabled: boolean = false; // This is used by child items

  @State()
  items: HTMLGuxSegmentedControlItemElement[] = [];

  @Listen('click')
  onClick(e: MouseEvent): void {
    e.stopPropagation();

    const switchItem = (e.target as HTMLElement).closest(
      'gux-segmented-control-item'
    );

    if (switchItem && this.value !== switchItem.value) {
      this.value = switchItem.value;

      simulateNativeEvent(this.root, 'input');
      simulateNativeEvent(this.root, 'change');
    }
  }

  @Watch('disabled')
  watchDisabled(): void {
    this.items.forEach(switchItem => {
      forceUpdate(switchItem);
    });
  }

  private slotChanged(): void {
    this.items = Array.from(
      this.root.children
    ) as HTMLGuxSegmentedControlItemElement[];
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  componentWillRender(): void {
    this.items.forEach(switchItem => {
      switchItem.selected = switchItem.value === this.value;
    });
  }

  render(): JSX.Element {
    return (
      <Host role="group">
        <slot onSlotchange={this.slotChanged.bind(this)} />
      </Host>
    ) as JSX.Element;
  }
}
