import { Component, h, JSX, Prop } from '@stencil/core';

export type GuxButtonAccent = 'primary' | 'secondary';

@Component({
  styleUrl: 'gux-button.less',
  tag: 'gux-button'
})
export class GuxButton {
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

  private get class(): string {
    if (this.accent === 'primary') {
      return 'gux-primary';
    }

    return 'gux-secondary';
  }

  render(): JSX.Element {
    return (
      <button title={this.title} disabled={this.disabled} class={this.class}>
        <slot />
      </button>
    );
  }
}
