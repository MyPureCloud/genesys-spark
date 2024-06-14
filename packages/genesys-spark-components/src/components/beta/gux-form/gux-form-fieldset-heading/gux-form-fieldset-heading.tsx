import { Component, h, JSX } from '@stencil/core';

/**
 * @slot - Slot for section heading element.
 */

@Component({
  styleUrl: 'gux-form-fieldset-heading.scss',
  tag: 'gux-form-fieldset-heading',
  shadow: true
})
export class GuxFormFieldsetHeading {
  render(): JSX.Element {
    return (<slot></slot>) as JSX.Element;
  }
}
