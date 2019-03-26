import { Component, Prop } from '@stencil/core';

@Component({
  styleUrl: 'gux-panel-frame.less',
  tag: 'gux-panel-frame'
})
export class GuxPanelFrame {
  /**
   * Style width of the component.
   */
  @Prop()
  width: string = '280px';

  render() {
    return (
      <div style={{ width: this.width }}>
        <slot/>
      </div>
    );
  }
}
