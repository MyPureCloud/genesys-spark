import { Component, h, JSX, Prop, Element } from '@stencil/core';

import { GuxCTAGroupAlignment } from './gux-cta-group.types';
import { logWarn } from '@utils/error/log-error';

@Component({
  styleUrl: 'gux-cta-group.scss',
  tag: 'gux-cta-group',
  shadow: true
})
export class GuxCTAGroup {
  /*
   * Reference to the host element.
   */
  @Element()
  root: HTMLElement;

  /**
   * Sets the buttons alignment
   */
  @Prop()
  align: GuxCTAGroupAlignment = 'start';

  /**
   * Defines if the primary button should have a danger accent
   */
  @Prop()
  dangerous: boolean = false;

  private validatePrimarySlot(
    slottedElement:
      | HTMLGuxButtonElement
      | HTMLGuxActionButtonElement
      | HTMLGuxButtonMultiElement
      | HTMLGuxButtonSlotElement
  ): void {
    if (!slottedElement) {
      logWarn(this.root, 'You must slot a primary CTA.');
      return;
    }

    const validButtonTags = [
      'GUX-BUTTON',
      'GUX-ACTION-BUTTON',
      'GUX-BUTTON-MULTI',
      'GUX-BUTTON-SLOT'
    ];
    const slottedTagName = slottedElement.tagName;
    if (!validButtonTags.includes(slottedTagName)) {
      logWarn(this.root, `You must slot a button element in the primary slot.`);
    }
    if (this.dangerous) {
      slottedElement.accent = 'danger';
    } else if (slottedElement.accent !== 'primary') {
      slottedElement.accent = 'primary';
    }
  }

  private validateSecondarySlot(
    slottedElement:
      | HTMLGuxButtonElement
      | HTMLGuxActionButtonElement
      | HTMLGuxButtonMultiElement
      | HTMLGuxButtonSlotElement
  ): void {
    if (slottedElement) {
      const slottedTagName = slottedElement.tagName;

      const validButtonTags = [
        'GUX-BUTTON',
        'GUX-ACTION-BUTTON',
        'GUX-BUTTON-MULTI',
        'GUX-BUTTON-SLOT'
      ];

      if (!validButtonTags.includes(slottedTagName)) {
        logWarn(
          this.root,
          `You must slot a button element in the secondary slot.`
        );
      } else if (slottedElement.accent !== 'secondary') {
        slottedElement.accent = 'secondary';
      }
    }
  }

  private validateDismissSlot(
    slottedElement: HTMLGuxButtonElement | HTMLGuxButtonSlotElement
  ): void {
    if (slottedElement) {
      const slottedTagName = slottedElement.tagName;

      const validButtonTags = ['GUX-BUTTON', 'GUX-BUTTON-SLOT'];

      if (!validButtonTags.includes(slottedTagName)) {
        logWarn(
          this.root,
          `You must slot a gux-button or gux-button-slot in the dismiss slot.`
        );
      } else if (slottedElement.accent !== 'ghost') {
        slottedElement.accent = 'ghost';
      }
    }
  }

  componentWillLoad(): void {
    this.validatePrimarySlot(this.root.querySelector('[slot=primary]'));
    this.validateSecondarySlot(this.root.querySelector('[slot=secondary]'));
    this.validateDismissSlot(this.root.querySelector('[slot=dismiss]'));
  }

  render(): JSX.Element {
    return (
      <div class={`gux-cta-group gux-${this.align}-align`}>
        <slot name="primary" />
        <slot name="secondary" />
        <slot name="dismiss" />
      </div>
    ) as JSX.Element;
  }
}
