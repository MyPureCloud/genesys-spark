import { Component, h, JSX } from '@stencil/core';

/**
 * @slot - Slot for section heading element.
 */

@Component({
  styleUrl: 'gux-form-heading.scss',
  tag: 'gux-form-heading',
  shadow: true
})
export class GuxFormHeading {
  render(): JSX.Element {
    return (<slot></slot>) as JSX.Element;
  }
}
