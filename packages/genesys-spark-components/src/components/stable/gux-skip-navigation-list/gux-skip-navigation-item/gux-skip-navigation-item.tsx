import { Component, Host, h, JSX } from '@stencil/core';

/**
 * @slot - hyperlink
 */

@Component({
  styleUrl: 'gux-skip-navigation-item.scss',
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
