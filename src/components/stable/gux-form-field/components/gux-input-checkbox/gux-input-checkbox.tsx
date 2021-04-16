import { Component, h, JSX } from '@stencil/core';

/**
 * @slot input - Required slot for input[type="checkbox"]
 * @slot label - Required slot for label
 */
@Component({
  styleUrl: 'gux-input-checkbox.less',
  tag: 'gux-input-checkbox'
})
export class GuxInputCheckbox {
  render(): JSX.Element {
    return (
      <div class="gux-input-checkbox-container">
        <slot name="input" />
        <slot name="label" />
      </div>
    );
  }
}
