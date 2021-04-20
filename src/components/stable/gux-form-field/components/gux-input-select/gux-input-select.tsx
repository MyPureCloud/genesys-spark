import { Component, Element, h, JSX, State } from '@stencil/core';

import { onDisabledChange } from '../../../../../utils/dom/on-attribute-change';

/**
 * @slot input - Required slot for select element
 */
@Component({
  styleUrl: 'gux-input-select.less',
  tag: 'gux-input-select'
})
export class GuxInputSelect {
  private input: HTMLInputElement;
  private disabledObserver: MutationObserver;

  @Element()
  private root: HTMLElement;

  @State()
  private disabled: boolean;

  async componentWillLoad(): Promise<void> {
    this.input = this.root.querySelector('select[slot="input"]');

    this.disabled = this.input.disabled;

    this.disabledObserver = onDisabledChange(
      this.input,
      (disabled: boolean) => {
        this.disabled = disabled;
      }
    );
  }

  disconnectedCallback(): void {
    this.disabledObserver.disconnect();
  }

  render(): JSX.Element {
    return (
      <div
        class={{
          'gux-input-container': true,
          'gux-disabled': this.disabled
        }}
      >
        <slot name="input" />
        <gux-icon decorative iconName="ic-dropdown-arrow"></gux-icon>
      </div>
    );
  }
}
