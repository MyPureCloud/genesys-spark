import { Component, h, Host, JSX } from '@stencil/core';

@Component({
  styleUrl: 'gux-list-divider.scss',
  tag: 'gux-list-divider',
  shadow: true
})
export class GuxListDivider {
  render(): JSX.Element {
    return (<Host role="presentation"></Host>) as JSX.Element;
  }
}
