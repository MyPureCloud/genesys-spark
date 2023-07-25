import { Component, h, JSX, Prop, Element } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';

import { GuxCardAccent } from './gux-card.types';

/**
 * @slot - Content of card.
 */

@Component({
  styleUrl: 'gux-card.scss',
  tag: 'gux-card',
  shadow: true
})
export class GuxCard {
  /*
   * Reference to the host element.
   */
  @Element()
  root: HTMLElement;

  /**
   * Card Accent.
   */
  @Prop()
  accent: GuxCardAccent = 'bordered';

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.accent });
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-card': true,
          [`gux-${this.accent}`]: true
        }}
      >
        <slot />
      </div>
    ) as JSX.Element;
  }
}
