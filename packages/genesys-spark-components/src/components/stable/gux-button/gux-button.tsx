import { Component, Element, h, JSX, Prop, State } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';
import { GuxButtonAccent, GuxButtonType } from './gux-button.types';
import { randomHTMLId } from '@utils/dom/random-html-id';

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
  private buttonId = randomHTMLId('button');

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
    return [
      <button
        id={this.buttonId}
        type={this.type}
        disabled={this.disabled}
        class={{
          [`gux-${this.accent}`]: true,
          'gux-icon-only': this.iconOnly
        }}
        aria-label={this.guxTitle}
      >
        <slot onSlotchange={this.slotChanged.bind(this)} />
      </button>,
      this.renderTooltip()
    ] as JSX.Element;
  }

  renderTooltip(): JSX.Element {
    return this.guxTitle
      ? ((
          <gux-tooltip-beta for={this.buttonId} visualOnly={true}>
            <div slot="content">{this.guxTitle}</div>
          </gux-tooltip-beta>
        ) as JSX.Element)
      : '';
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
    } else if (
      children.length === 2 &&
      children[0].tagName === 'GUX-ICON' &&
      children[1].tagName === 'GUX-TOOLTIP'
    ) {
      return true;
    }

    return false;
  }

  private slotChanged() {
    this.makeSlotContentDisableable();
    this.iconOnly = this.hasIconOnly();
  }
}
