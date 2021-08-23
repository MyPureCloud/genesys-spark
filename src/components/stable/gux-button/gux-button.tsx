import { Component, Element, h, JSX, Method, Prop } from '@stencil/core';

import { trackComponent } from '../../../usage-tracking';
import { GuxButtonAccent, GuxButtonType } from './gux-button.types';

@Component({
  styleUrl: 'gux-button.less',
  tag: 'gux-button'
})
export class GuxButton {
  @Element()
  private root: HTMLElement;

  /**
   * The component button type
   */
  @Prop()
  type: GuxButtonType = 'button';

  /**
   * The component title
   */
  @Prop()
  guxTitle: string;

  /**
   * Deprecated, use guxTitle instead
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

  /**
   * Focus the button
   */
  @Method()
  async focusElement() {
    this.root.querySelector('button').focus();
  }

  componentWillLoad() {
    trackComponent(this.root, { variant: this.accent });
    this.makeSlotContentDisableable();
  }

  render(): JSX.Element {
    return (
      <button
        type={this.type}
        title={this.guxTitle ? this.guxTitle : this.title}
        disabled={this.disabled}
        class={`gux-${this.accent}`}
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
