import { Component, Element, JSX, h, State, Prop } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { OnMutation } from '@utils/decorator/on-mutation';
import { hasSlot } from '@utils/dom/has-slot';
import {
  GuxBlankStateAlignment,
  GuxBlankStateVariant
} from './gux-blank-state.types';
import { renderVariantIllustration } from './gux-blank-state.service';

/**
 * @slot primary-message - Required slot for primary-message.
 * @slot image - Slot for gux-icon element.
 * @slot additional-guidance - Slot for additional-guidance.
 * @slot call-to-action - Slot for the message call to action button.
 */

@Component({
  styleUrl: 'gux-blank-state.scss',
  tag: 'gux-blank-state-beta',
  shadow: true
})
export class GuxBlankStateBeta {
  @Element()
  root: HTMLElement;

  @State()
  private hasCallToAction: boolean = false;

  @State()
  private hasGuidance: boolean = false;

  @Prop()
  alignment: GuxBlankStateAlignment = 'center';

  @Prop()
  variant: GuxBlankStateVariant;

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.hasCallToAction = hasSlot(this.root, 'call-to-action');
    this.hasGuidance = hasSlot(this.root, 'additional-guidance');
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

  private renderGuidanceSlot(): JSX.Element {
    if (this.hasGuidance) {
      return (
        <div class="gux-guidance">
          <slot name="additional-guidance"></slot>
        </div>
      ) as JSX.Element;
    }
  }

  componentWillLoad() {
    trackComponent(this.root);

    this.hasCallToAction = hasSlot(this.root, 'call-to-action');
    this.hasGuidance = hasSlot(this.root, 'additional-guidance');
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-container': true,
          [`gux-alignment-left`]: this.alignment === 'left'
        }}
      >
        <div class="gux-image">
          {this.variant ? (
            renderVariantIllustration(this.variant)
          ) : (
            <slot name="image"></slot>
          )}
        </div>
        <div class="gux-message">
          <slot name="primary-message"></slot>
        </div>
        {this.renderGuidanceSlot()}
        {this.renderCallToActionSlot()}
      </div>
    ) as JSX.Element;
  }
}
