import { Component, h, Host, JSX } from '@stencil/core';

/**
 * @slot - collection of menu-option, submenu elements
 */

@Component({
  styleUrl: 'gux-menu.scss',
  tag: 'gux-menu',
  shadow: true
})
export class GuxMenu {
  render(): JSX.Element {
    return (
      <Host role="menu">
        <slot />
      </Host>
    ) as JSX.Element;
  }
}
