import { Component, Element, JSX, h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot primary-message - Required slot for primary-message.
 * @slot image - Slot for gux-icon element.
 * @slot additional-guidance - Slot for additional-guidance.
 * @slot call-to-action - Slot for the message call to action button.
 */

@Component({
  styleUrl: 'gux-blank-state.scss',
  tag: 'gux-blank-state',
  shadow: true
})
export class GuxBlankState {
  @Element()
  root: HTMLElement;

  componentWillLoad() {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <div class="gux-container">
        <div class="gux-image">
          <slot name="image"></slot>
        </div>
        <div class="gux-message">
          <slot name="primary-message"></slot>
        </div>
        <div class="gux-guidance">
          <slot name="additional-guidance"></slot>
        </div>
        <gux-button-slot accent="primary">
          <slot name="call-to-action"></slot>
        </gux-button-slot>
      </div>
    ) as JSX.Element;
  }
}
