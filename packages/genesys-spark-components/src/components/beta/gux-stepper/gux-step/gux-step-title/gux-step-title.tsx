import {
  Component,
  Element,
  Event,
  EventEmitter,
  Listen,
  h
} from '@stencil/core';
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

  @Event()
  internalactivestepchange: EventEmitter<string>;

  @Listen('click')
  onClick() {
    if (!this.stepDisabledState) {
      this.internalactivestepchange.emit();
    }
  }

  // Get the disabled state from the closest gux-step-beta element.
  get stepDisabledState(): boolean {
    return this.root.closest('gux-step')?.disabled;
  }

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <button type="button" disabled={this.stepDisabledState}>
        <gux-truncate maxLines={2}>
          <slot></slot>
        </gux-truncate>
      </button>
    ) as JSX.Element;
  }
}
