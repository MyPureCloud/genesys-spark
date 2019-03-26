import { Component } from '@stencil/core';

@Component({
  styleUrl: 'gux-panel-header.less',
  tag: 'gux-panel-header'
})
export class GuxPanelHeader {
  render() {
    return <slot/>;
  }
}
