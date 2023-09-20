import { Component, Element, JSX, h } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot progress - Required slot for progress.
 * @slot primary-guidance - Required slot for primary guidance.
 * @slot additional-guidance - Slot for additional guidance.
 */

@Component({
  styleUrl: 'gux-loading-message.scss',
  tag: 'gux-loading-message',
  shadow: true
})
export class GuxLoadingMessage {
  @Element()
  root: HTMLElement;

  componentWillLoad() {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <div class="gux-container" role="alert" aria-live="assertive">
        <div class="gux-progress">
          <slot name="progress"></slot>
        </div>
        <div class="gux-primary-message">
          <slot name="primary-message"></slot>
        </div>
        <div class="gux-additional-guidance">
          <slot name="additional-guidance"></slot>
        </div>
      </div>
    ) as JSX.Element;
  }
}
