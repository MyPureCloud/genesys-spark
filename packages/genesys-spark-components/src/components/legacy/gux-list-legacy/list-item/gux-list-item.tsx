import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  JSX,
  Listen,
  Prop
} from '@stencil/core';

import { GuxTextHighlightStrategy } from '../../../stable/gux-text-highlight/gux-text-highlight.types';

@Component({
  styleUrl: 'gux-list-item.less',
  tag: 'gux-list-item-legacy',
  shadow: true
})
export class GuxListItemLegacy {
  /**
   * The value to display.
   */
  @Prop()
  text: string;

  /**
   * The value associated with this item.
   */
  @Prop()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;

  /**
   * How the item should be highlighted.
   */
  @Prop()
  strategy: GuxTextHighlightStrategy;

  /**
   * Emits when the list item is clicked, or enter/space is pressed.
   */
  @Event()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  press: EventEmitter<any>;

  @Listen('click')
  handleClick() {
    this.onItemClicked();
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.onItemClicked();
    }
  }

  render(): JSX.Element {
    return (
      <Host role="listitem">
        <span class="gux-list-item">
          {this.text && (
            <gux-text-highlight
              class="gux-text"
              text={this.text}
              strategy={this.strategy}
            />
          )}
          <slot />
        </span>
      </Host>
    ) as JSX.Element;
  }

  private onItemClicked(): void {
    this.emitPress();
  }

  private emitPress() {
    this.press.emit(this.value);
  }
}
