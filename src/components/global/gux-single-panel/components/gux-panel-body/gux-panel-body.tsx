import { Component } from '@stencil/core';

@Component({
  styleUrl: 'gux-panel-body.less',
  tag: 'gux-panel-body'
})
export class GuxPanelBody {
  render() {
    return <slot/>;
  }
}
