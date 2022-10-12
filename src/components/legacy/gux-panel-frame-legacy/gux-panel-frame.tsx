import { Component, Element, h, JSX } from '@stencil/core';

import { hasSlot } from 'utils/dom/has-slot';
import { trackComponent } from 'usage-tracking';

/**
 * @slot header - slot for header content
 * @slot body - slot for body content
 * @slot footer - slot for footer content
 */
@Component({
  styleUrl: 'gux-panel-frame.less',
  tag: 'gux-panel-frame-legacy',
  shadow: true
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
          ) as JSX.Element;
        case 'body':
          return (
            <div class="gux-panel-body">
              <slot name={`${slotName}`} />
            </div>
          ) as JSX.Element;
        case 'footer':
          return (
            <footer class="gux-panel-footer">
              <slot name={`${slotName}`} />
            </footer>
          ) as JSX.Element;
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
    ) as JSX.Element;
  }
}
