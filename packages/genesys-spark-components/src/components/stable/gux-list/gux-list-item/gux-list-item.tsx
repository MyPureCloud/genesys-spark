import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';

/**
 * @slot - text
 */

@Component({
  styleUrl: 'gux-list-item.scss',
  tag: 'gux-list-item',
  shadow: { delegatesFocus: true }
})
export class GuxListItem {
  @Element()
  root: HTMLGuxListItemElement;

  @Prop()
  disabled: boolean = false;

  render(): JSX.Element {
    return (
      <Host role="listitem">
        <button type="button" tabIndex={-1} disabled={this.disabled}>
          <slot></slot>
        </button>
      </Host>
    ) as JSX.Element;
  }
}
