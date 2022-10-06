import { Component, Element, h, JSX } from '@stencil/core';
import { trackComponent } from 'usage-tracking';

/**
 * @slot error(default) - Required slot for error
 */
@Component({
  styleUrl: 'gux-error-message-beta.less',
  tag: 'gux-error-message-beta',
  shadow: true
})
export class GuxErrorMessageBeta {
  @Element()
  private root: HTMLElement;

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <div class="gux-container">
        <gux-icon icon-name="alert-warning-octogon" decorative></gux-icon>
        <div class="gux-message">
          <slot />
          <slot name="error" />
        </div>
      </div>
    ) as JSX.Element;
  }
}
