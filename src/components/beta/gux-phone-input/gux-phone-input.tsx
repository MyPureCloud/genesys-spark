import { Component, Element, h, JSX, Prop } from '@stencil/core';
import { trackComponent } from '../../../usage-tracking';

@Component({
  tag: 'gux-phone-input-beta',
  shadow: true
})
export class GuxPhoneInput {
  @Element()
  root: HTMLElement;

  @Prop({ mutable: true })
  value: string;

  componentWillLoad(): void {
    trackComponent(this.root);
  }

  render(): JSX.Element {
    return (
      <div class="gux-phone-container">
        <gux-country-select />
        <input type="text" />
      </div>
    );
  }
}
