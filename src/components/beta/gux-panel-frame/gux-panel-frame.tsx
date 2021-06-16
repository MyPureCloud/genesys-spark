import { Component, Element, h, JSX } from '@stencil/core';

import { hasSlot } from '../../../utils/dom/has-slot';
import { trackComponent } from '../../../usage-tracking';

/**
 * @slot header - slot for header content
 * @slot body - slot for body content
 * @slot footer - slot for footer content
 */
@Component({
  styleUrl: 'gux-panel-frame.less',
  tag: 'gux-panel-frame-beta'
})
export class GuxPanelFrame {
  @Element()
  root: HTMLElement;

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  private renderOptionalSlot(slotName: string): JSX.Element {
    if (hasSlot(this.root, slotName)) {
      switch (slotName) {
        case 'header':
          return (
            <header class="gux-panel-header">
              <slot name={`${slotName}`} />
            </header>
          );
        case 'body':
          return (
            <div class="gux-panel-body">
              <slot name={`${slotName}`} />
            </div>
          );
        case 'footer':
          return (
            <footer class="gux-panel-footer">
              <slot name={`${slotName}`} />
            </footer>
          );
      }
    }
  }

  render(): JSX.Element {
    return (
      <section class="gux-panel-container">
        {this.renderOptionalSlot('header')}
        {this.renderOptionalSlot('body')}
        {this.renderOptionalSlot('footer')}
      </section>
    );
  }
}
