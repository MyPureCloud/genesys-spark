import { Component, Element, JSX, h, State } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { OnMutation } from '@utils/decorator/on-mutation';
import { hasSlot } from '@utils/dom/has-slot';

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

  @State()
  private hasCallToAction: boolean = false;

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.hasCallToAction = hasSlot(this.root, 'call-to-action');
  }

  private renderCallToActionSlot(): JSX.Element {
    if (this.hasCallToAction) {
      return (
        <gux-button-slot accent="primary">
          <slot name="call-to-action"></slot>
        </gux-button-slot>
      ) as JSX.Element;
    }
  }

  componentWillLoad() {
    trackComponent(this.root);

    this.hasCallToAction = hasSlot(this.root, 'call-to-action');
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
        {this.renderCallToActionSlot()}
      </div>
    ) as JSX.Element;
  }
}
