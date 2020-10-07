import { Component, Element, h, JSX, Prop } from '@stencil/core';

import { GuxButtonAccent } from './gux-button.types';

@Component({
  styleUrl: 'gux-button.less',
  tag: 'gux-button'
})
export class GuxButton {
  @Element()
  private root: HTMLElement;

  /**
   * The component title
   */
  @Prop()
  title: string;

  /**
   * Indicate if the button is disabled or not
   */
  @Prop()
  disabled = false;

  /**
   * The component accent (secondary or primary).
   */
  @Prop()
  accent: GuxButtonAccent = 'secondary';

  componentWillLoad() {
    this.makeSlotContentDisableable();
  }

  render(): JSX.Element {
    return (
      <button
        title={this.title}
        disabled={this.disabled}
        class={this.accent === 'primary' ? 'gux-primary' : 'gux-secondary'}
      >
        <slot />
      </button>
    );
  }

  private makeSlotContentDisableable() {
    Array.from(this.root.children).forEach(slotElement => {
      slotElement.addEventListener('click', (event: MouseEvent): void => {
        if (this.disabled) {
          event.stopImmediatePropagation();
          event.stopPropagation();
          event.preventDefault();
        }
      });
    });
  }
}
