import { Component, Host, h, JSX } from '@stencil/core';

@Component({
  styleUrl: 'gux-skip-navigation-item.less',
  tag: 'gux-skip-navigation-item',
  shadow: { delegatesFocus: true }
})
export class GuxSkipNavigationItem {
  render(): JSX.Element {
    return (
      <Host role="listitem">
        <slot />
      </Host>
    ) as JSX.Element;
  }
}
