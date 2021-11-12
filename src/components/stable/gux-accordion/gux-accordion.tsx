import { Component, Element, h } from '@stencil/core';

import { trackComponent } from '../../../usage-tracking';

@Component({
  styleUrl: 'gux-accordion.less',
  tag: 'gux-accordion',
  shadow: true
})
export class GuxAccordion {
  @Element()
  root: HTMLElement;

  componentWillLoad() {
    trackComponent(this.root);
  }

  render() {
    return <slot></slot>;
  }
}
