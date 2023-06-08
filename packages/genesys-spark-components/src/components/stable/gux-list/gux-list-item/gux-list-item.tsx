import { Component, Element, h, Host, JSX, Listen, Prop } from '@stencil/core';

import { getClosestElement } from '../../../../utils/dom/get-closest-element';

/**
 * @slot - text
 */

@Component({
  styleUrl: 'gux-list-item.less',
  tag: 'gux-list-item',
  shadow: { delegatesFocus: true }
})
export class GuxListItem {
  @Element()
  root: HTMLGuxListItemElement;

  @Prop()
  disabled: boolean = false;

  @Listen('mouseup')
  onMouseup(): void {
    this.focusParentList();
  }

  @Listen('mouseover')
  onMouseover(): void {
    this.focusParentList();
  }

  private focusParentList(): void {
    const parentList = getClosestElement('gux-list', this.root) as HTMLElement;

    if (parentList && parentList.shadowRoot.activeElement === null) {
      this.root.blur();
      parentList.focus({
        preventScroll: true
      });
    }
  }

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
