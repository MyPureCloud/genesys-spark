import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  tag: 'gux-action-item'
})
export class GuxActionItem {
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
  press: EventEmitter<any>;

  render() {
    return (
      <gux-list-item text={this.text} value={this.value}>
        <slot />
      </gux-list-item>
    );
  }
}
