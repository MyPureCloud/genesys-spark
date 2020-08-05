import { Component, Element, h, JSX, Prop } from '@stencil/core';

export type GuxButtonAccent = 'primary' | 'secondary';

@Component({
  styleUrl: 'gux-button.less',
  tag: 'gux-button'
})
export class GuxButton {
  private get class(): string {
    if (this.accent === 'primary') {
      return 'gux-primary';
    }

    return 'gux-secondary';
  }

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
  @Element()
  private root: HTMLGuxButtonElement;

  componentWillLoad() {
    this.makeSlotContentDisableable();
  }

  render(): JSX.Element {
    return (
      <button title={this.title} disabled={this.disabled} class={this.class}>
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
