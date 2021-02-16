import { Component, Element, h, JSX, Prop } from '@stencil/core';

import { GuxButtonAccent } from '../../stable/gux-button/gux-button.types';

/**
 * @slot - button, input[type="button"] or input[type="submit"] element
 */
@Component({
  styleUrl: 'gux-button-slot.less',
  tag: 'gux-button-slot-beta'
})
export class GuxButtonSlotBeta {
  @Element() root: HTMLElement;
  /**
   * The component accent.
   */
  @Prop()
  accent: GuxButtonAccent = 'secondary';

  componentWillLoad(): void {
    const slottedTagName = this.root.children[0].tagName;

    if (slottedTagName === 'BUTTON') {
      return;
    } else if (slottedTagName === 'INPUT') {
      const slottedInputType = this.root.children[0].getAttribute('type');

      if (slottedInputType === 'button' || slottedInputType === 'submit') {
        return;
      }
    }

    console.error(
      'gux-button-slot: You must slot a button, input[type="button"] or input[type="submit"] tag.'
    );
  }

  render(): JSX.Element {
    return <slot />;
  }
}
