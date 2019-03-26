import { Component, Element, Prop } from '@stencil/core';
import { position } from './constants';

@Component({
  styleUrl: 'gux-panel-footer-position.less',
  tag: 'gux-panel-footer-position'
})

export class GuxPanelFooterPosition {
  @Element()
  root: HTMLStencilElement;

  /**
   * Position of the component.
   */
  @Prop()
  position: position = 'left';

  componentWillLoad() {
    this.root.className = this.position;
  }

  render() {
    return<slot/>;
  }
}
