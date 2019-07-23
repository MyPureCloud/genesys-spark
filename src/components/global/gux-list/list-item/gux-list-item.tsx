import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop
} from '@stencil/core';
import { KeyCode } from '../../../../common-enums';

@Component({
  styleUrl: 'gux-list-item.less',
  tag: 'gux-list-item'
})
export class GuxListItem {
  @Element()
  root: HTMLElement;

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
   * Emits when the list item action is triggered.
   */
  @Event()
  action: EventEmitter<any>;

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
        <span class="list-item">
          <slot>{this.text && <gux-text-highlight text={this.text} />}</slot>
        </span>
      </Host>
    );
  }

  private onItemClicked(): void {
    this.emitAction();
  }

  private emitAction() {
    this.action.emit(this.value);
  }
}
