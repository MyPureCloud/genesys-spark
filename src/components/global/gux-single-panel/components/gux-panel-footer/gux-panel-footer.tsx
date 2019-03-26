import { Component } from '@stencil/core';

@Component({
  styleUrl: 'gux-panel-footer.less',
  tag: 'gux-panel-footer'
})
export class GuxPanelFooter {
  render() {
    return (
      <div>
        <slot/>
      </div>
    );
  }
}
