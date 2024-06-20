import { Component, h, JSX } from '@stencil/core';

/**
 *  @slot - Slot for description.
 */

@Component({
  styleUrl: 'gux-form-description.scss',
  tag: 'gux-form-description',
  shadow: true
})
export class GuxFormDescription {
  render(): JSX.Element {
    return (<slot></slot>) as JSX.Element;
  }
}
