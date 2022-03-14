import { Component, h, Host, JSX } from '@stencil/core';

@Component({
  styleUrl: 'gux-action-list-divider.less',
  tag: 'gux-action-list-divider',
  shadow: true
})
export class GuxActionListDivider {
  render(): JSX.Element {
    return (<Host role="presentation" tabIndex={-1}></Host>) as JSX.Element;
  }
}
