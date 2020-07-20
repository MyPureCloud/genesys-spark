import { Component, h } from '@stencil/core';

/**
 * @slot error - Required slot for error
 */
@Component({
  styleUrl: 'gux-error-message-beta.less',
  tag: 'gux-error-message-beta'
})
export class GuxErrorMessageBeta {
  render() {
    return (
      <div class="container">
        <div class="icon">
          <gux-icon icon-name="ic-error-bold" decorative></gux-icon>
        </div>
        <div class="message">
          <slot slot="error" />
        </div>
      </div>
    );
  }
}
