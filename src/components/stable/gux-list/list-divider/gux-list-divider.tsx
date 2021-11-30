import { Component, h, JSX } from '@stencil/core';

@Component({
  styleUrl: 'gux-list-divider.less',
  tag: 'gux-list-divider',
  shadow: true
})
export class GuxListDivider {
  render(): JSX.Element {
    return (
      <span
        role="presentation"
        class="gux-list-item gux-divider"
        tabindex={-1}
      />
    ) as JSX.Element;
  }
}
