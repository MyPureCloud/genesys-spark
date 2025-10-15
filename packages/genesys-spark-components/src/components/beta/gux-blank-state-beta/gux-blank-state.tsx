import { Component, Element, JSX, h, State, Prop } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';
import { OnMutation } from '@utils/decorator/on-mutation';
import { hasSlot } from '@utils/dom/has-slot';
import { GuxBlankStateAlignment } from './gux-blank-state.types';

/**
 * @slot primary-message - Required slot for primary-message.
 * @slot image - Slot for gux-icon element or gux-illustration-beta.
 * @slot additional-guidance - Slot for additional-guidance.
 * @slot call-to-action - Slot for the message call to action button.
 * @slot secondary-call-to-action - Slot for the message call to action secondary button.
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
  private hasSecondaryCallToAction: boolean = false;

  @State()
  private hasGuidance: boolean = false;

  @Prop()
  alignment: GuxBlankStateAlignment = 'center';

  @Prop()
  noPadding: boolean = false;

  @OnMutation({ childList: true, subtree: true })
  onMutation(): void {
    this.hasCallToAction = hasSlot(this.root, 'call-to-action');
    this.hasGuidance = hasSlot(this.root, 'additional-guidance');
    this.hasSecondaryCallToAction = hasSlot(
      this.root,
      'secondary-call-to-action'
    );
  }

  private renderImageSlot(): JSX.Element {
    return (<slot name="image"></slot>) as JSX.Element;
  }

  private renderCallToActions(): JSX.Element {
    if (this.hasCallToAction) {
      return (
        <div class="gux-call-to-actions">
          {this.hasCallToAction && (
            <gux-button-slot accent="primary">
              <slot name="call-to-action"></slot>
            </gux-button-slot>
          )}
          {this.hasSecondaryCallToAction && (
            <gux-button-slot accent="ghost">
              <slot name="secondary-call-to-action"></slot>
            </gux-button-slot>
          )}
        </div>
      ) as JSX.Element;
    }
  }

  private renderGuidanceSlot(): JSX.Element {
    if (this.hasGuidance) {
      return (
        <div class="gux-guidance">
          <gux-truncate maxLines={3}>
            <slot name="additional-guidance"></slot>
          </gux-truncate>
        </div>
      ) as JSX.Element;
    }
  }

  componentWillLoad() {
    trackComponent(this.root);

    this.hasCallToAction = hasSlot(this.root, 'call-to-action');
    this.hasGuidance = hasSlot(this.root, 'additional-guidance');
    this.hasSecondaryCallToAction = hasSlot(
      this.root,
      'secondary-call-to-action'
    );
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-container': true,
          'gux-no-padding': this.noPadding,
          'gux-alignment-left': this.alignment === 'left'
        }}
      >
        <div class="gux-image">{this.renderImageSlot()}</div>
        <div class="gux-message">
          <slot name="primary-message"></slot>
        </div>
        {this.renderGuidanceSlot()}
        {this.renderCallToActions()}
      </div>
    ) as JSX.Element;
  }
}
