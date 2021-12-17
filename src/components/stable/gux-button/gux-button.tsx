import { Component, Element, h, JSX, Method, Prop } from '@stencil/core';

import { trackComponent } from '../../../usage-tracking';
import { GuxButtonAccent, GuxButtonType } from './gux-button.types';

@Component({
  styleUrl: 'gux-button.less',
  tag: 'gux-button'
  // NOTE: In the future if we migrate this to shadowDOM, `delegatesFocus` so .focus() works
  //   This will let us remove a workaround for gux-buttons in gux-modal.
  // shadow: { delegatesFocus: true }
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
   * Indicate if the button is disabled or not
   */
  @Prop()
  disabled: boolean = false;

  /**
   * The component accent (secondary or primary).
   */
  @Prop()
  accent: GuxButtonAccent = 'secondary';

  /**
   * Focus the button
   */
  // eslint-disable-next-line @typescript-eslint/require-await
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
        title={this.guxTitle}
        disabled={this.disabled}
        class={`gux-${this.accent}`}
      >
        <slot />
      </button>
    ) as JSX.Element;
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
