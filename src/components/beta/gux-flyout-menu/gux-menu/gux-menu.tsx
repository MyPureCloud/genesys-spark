import { Component, h, Host, JSX } from '@stencil/core';

@Component({
  styleUrl: 'gux-menu.less',
  tag: 'gux-menu'
})
export class GuxMenu {
  render(): JSX.Element {
    return (
      <Host role="menu">
        <slot />
      </Host>
    );
  }
}
