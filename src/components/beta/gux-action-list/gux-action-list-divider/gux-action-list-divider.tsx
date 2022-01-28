import { Component, h, JSX } from '@stencil/core';

@Component({
  styleUrl: 'gux-action-list-divider.less',
  tag: 'gux-action-list-divider',
  shadow: true
})
export class GuxActionListDivider {
  render(): JSX.Element {
    return (
      <span
        role="presentation"
        class="gux-action-list-item gux-divider"
        tabindex={-1}
      />
    ) as JSX.Element;
  }
}
