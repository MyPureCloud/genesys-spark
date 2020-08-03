import { Component, h, JSX } from '@stencil/core';

/**
 * @slot input - Required slot for input[type="radio"]
 * @slot label - Required slot for label
 */
@Component({
  styleUrl: 'gux-input-text-like-beta.less',
  tag: 'gux-input-text-like-beta'
})
export class GuxInputTextLikeBeta {
  render(): JSX.Element {
    return <slot name="input" />;
  }
}
