import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop
} from '@stencil/core';

import { KeyCode } from '../../../../common-enums';
import { GuxTextHighlightStrategy } from '../../gux-text-highlight/gux-text-highlight.types';

@Component({
  styleUrl: 'gux-list-item.less',
  tag: 'gux-list-item'
})
export class GuxListItem {
  /**
   * The value to display.
   */
  @Prop()
  text: string;

  /**
   * The value associated with this item.
   */
  @Prop()
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
  press: EventEmitter<any>;

  @Listen('click')
  handleClick() {
    this.onItemClicked();
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent): void {
    if (event.keyCode === KeyCode.Enter || event.keyCode === KeyCode.Space) {
      this.onItemClicked();
    }
  }

  render() {
    return (
      <Host role="listitem">
        <span class="gux-list-item">
          {this.text && (
            <gux-text-highlight text={this.text} strategy={this.strategy} />
          )}
          <slot />
        </span>
      </Host>
    );
  }

  private onItemClicked(): void {
    this.emitPress();
  }

  private emitPress() {
    this.press.emit(this.value);
  }
}
