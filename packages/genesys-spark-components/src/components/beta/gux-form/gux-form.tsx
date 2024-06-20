import { Component, h, JSX } from '@stencil/core';

/**
 * @slot - Slot for form element.
 */

@Component({
  tag: 'gux-form-beta',
  shadow: true
})
export class GuxForm {
  render(): JSX.Element {
    return (<slot></slot>) as JSX.Element;
  }
}
