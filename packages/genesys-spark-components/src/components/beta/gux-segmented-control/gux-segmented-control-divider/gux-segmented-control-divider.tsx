import { Component, h, Host, JSX } from '@stencil/core';

@Component({
  styleUrl: 'gux-segmented-control-divider.scss',
  tag: 'gux-segmented-control-divider',
  shadow: true
})
export class GuxSegmentedControlDivider {
  render(): JSX.Element {
    return (
      <Host role="presentation">
        <div class="gux-segmented-control-divider"></div>
      </Host>
    ) as JSX.Element;
  }
}
