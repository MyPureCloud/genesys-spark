import { Component, h, JSX, Element } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot - Slot for selector cards
 */

@Component({
  styleUrl: 'gux-selector-cards.scss',
  tag: 'gux-selector-cards-beta',
  shadow: true
})
export class GuxSelectorCards {
  @Element()
  private root: HTMLElement;

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <div class="gux-selector-cards">
        <slot></slot>
      </div>
    ) as JSX.Element;
  }
}
