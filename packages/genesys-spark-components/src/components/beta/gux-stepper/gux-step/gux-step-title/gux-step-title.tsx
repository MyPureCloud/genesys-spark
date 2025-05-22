import { Component, Element, Prop, h } from '@stencil/core';
import { trackComponent } from '@utils/tracking/usage';

/**
 * @slot - slot for text
 */

@Component({
  tag: 'gux-step-title',
  styleUrl: 'gux-step-title.scss',
  shadow: true
})
export class GuxStepTitle {
  @Element()
  private root: HTMLElement;

  @Prop()
  isNumerical: boolean = false;

  // Get the disabled state from the closest gux-step element.
  get stepDisabledState(): boolean {
    return this.root.closest('gux-step-beta')?.disabled;
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <button type="button" disabled={this.stepDisabledState}>
        <gux-truncate maxLines={1}>
          <slot></slot>
        </gux-truncate>
      </button>
    ) as JSX.Element;
  }
}
