import { Component, Element, h, JSX } from '@stencil/core';

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

  render(): JSX.Element {
    return (<slot></slot>) as JSX.Element;
  }
}
