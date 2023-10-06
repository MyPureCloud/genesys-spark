import { Component, Element, h, JSX, Prop, State } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';
import { GuxButtonAccent, GuxButtonType } from './gux-button.types';

/**
 * @slot - content
 */

@Component({
  styleUrl: 'gux-button.scss',
  tag: 'gux-button',
  shadow: { delegatesFocus: true }
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

  @Prop()
  accent: GuxButtonAccent = 'secondary';

  @State()
  iconOnly: boolean;

  connectedCallback() {
    this.slotChanged();
  }

  componentWillLoad() {
    trackComponent(this.root, { variant: this.accent });
  }

  render(): JSX.Element {
    return (
      <button
        type={this.type}
        title={this.guxTitle}
        disabled={this.disabled}
        class={{
          [`gux-${this.accent}`]: true,
          'gux-icon-only': this.iconOnly
        }}
      >
        <slot onSlotchange={this.slotChanged.bind(this)} />
      </button>
    ) as JSX.Element;
  }

  private stopEventIfDisabled(event: Event) {
    if (this.disabled) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
    }
  }

  private makeSlotContentDisableable() {
    this.root.shadowRoot.addEventListener('click', (event: MouseEvent) =>
      this.stopEventIfDisabled(event)
    );

    Array.from(this.root.children).forEach(slotElement => {
      slotElement.addEventListener('click', (event: MouseEvent) =>
        this.stopEventIfDisabled(event)
      );
    });
  }

  private hasIconOnly(): boolean {
    const children = Array.from(this.root.children);

    if (children.length === 1) {
      const child = children[0];
      if (child.tagName === 'GUX-ICON') {
        return true;
      }
    }

    return false;
  }

  private slotChanged() {
    this.makeSlotContentDisableable();
    this.iconOnly = this.hasIconOnly();
  }
}
