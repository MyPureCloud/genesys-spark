import { Component, JSX, h, Element } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot - text
 */
@Component({
  styleUrl: 'gux-screen-reader.scss',
  tag: 'gux-screen-reader-beta',
  shadow: true
})
export class GuxScreenReader {
  @Element()
  root: HTMLElement;

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render() {
    return (
      <span class="gux-sr-only">
        <slot></slot>
      </span>
    ) as JSX.Element;
  }
}
