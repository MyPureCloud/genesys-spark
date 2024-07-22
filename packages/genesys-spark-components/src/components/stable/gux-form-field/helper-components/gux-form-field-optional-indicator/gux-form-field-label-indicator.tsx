import { Component, Element, h, JSX, Prop } from '@stencil/core';

import { trackComponent } from '@utils/tracking/usage';

import { GuxFormFieldLabelIndicatorVariant } from './gux-form-field-label-indicator.types';

@Component({
  styleUrl: 'gux-form-field-label-indicator.scss',
  tag: 'gux-form-field-label-indicator'
})
export class GuxFormFieldLabelIndicator {
  @Element()
  private root: HTMLElement;

  @Prop()
  variant: GuxFormFieldLabelIndicatorVariant = 'required';

  @Prop()
  required: boolean = false;

  componentWillLoad(): void {
    trackComponent(this.root, { variant: this.variant });
  }

  render(): JSX.Element {
    if (this.variant === 'required' && this.required) {
      return (
        <span
          class="gux-form-field-label-indicator-required"
          aria-hidden="true"
        >
          *
        </span>
      ) as JSX.Element;
    } else {
      return null;
    }
  }
}
