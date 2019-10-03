import { Component, Element, h, Prop, State } from '@stencil/core';

import { ButtonAccents } from '../../../common-enums';

@Component({
  styleUrl: 'gux-button.less',
  tag: 'gux-button'
})
export class GuxButton {
  @Element()
  root: HTMLGuxButtonElement;
  button: HTMLButtonElement;

  /**
   * Indicate if the button is disabled or not
   */
  @Prop({ reflectToAttr: true })
  disabled = false;

  /**
   * The component accent (secondary or primary).
   */
  @Prop()
  accent: ButtonAccents = ButtonAccents.Secondary;

  @State()
  title: string;

  async componentDidLoad() {
    this.title = this.root.title;
  }

  private get accentClass() {
    const accent =
      this.accent === ButtonAccents.Primary
        ? ButtonAccents.Primary
        : ButtonAccents.Secondary;

    return `gux-${accent}`;
  }

  render() {
    return (
      <button
        title={this.title}
        ref={el => (this.button = el)}
        disabled={this.disabled}
        class={this.accentClass}
      >
        <slot />
      </button>
    );
  }
}
