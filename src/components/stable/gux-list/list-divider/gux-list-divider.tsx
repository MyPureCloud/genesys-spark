import { Component, h } from '@stencil/core';

@Component({
  styleUrl: 'gux-list-divider.less',
  tag: 'gux-list-divider'
})
export class GuxListDivider {
  render() {
    return (
      <span
        role="presentation"
        class="gux-list-item gux-divider"
        tabindex={-1}
      />
    );
  }
}
